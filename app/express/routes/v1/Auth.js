const { Logger, ConfigManager: { getConfig } } = require('@dojot/microservice-sdk');
const createError = require('http-errors');
const { generatePKCEChallenge } = require('../../../Utils');

const {
  app: configApp,
} = getConfig('BS');

const BASE_URL = configApp['base.url'];

const logger = new Logger('backstage:express/routes/v1/Auth');

const buildReturnPath = (returnPath) => {
  let newReturnPath = returnPath || '/';

  // if not starting with /, additional
  if (newReturnPath.charAt(0) !== '/') newReturnPath = `/${newReturnPath}`;

  return newReturnPath;
};

/**
 * Routes to Auth
 *
 * @param {string} object.mountPoint be used as a route prefix
 *  @param {an instance of ../keycloak} object.keycloak instance of the Keycloak class
*/
module.exports = ({ mountPoint, keycloak }) => {
  /**
   *  Create session, generate PKCE, and redirect to the
   *  keycloak login screen using the OAuth2/OIDC protocols.
   */
  const auth = {
    mountPoint,
    name: 'auth-route',
    path: ['/auth'],
    handlers: [
      {
        method: 'get',
        middleware: [
          async (req, res) => {
            logger.debug('auth-route.get: req.query=', req.query);
            logger.debug('auth-route.get: req.sessionID=', req.sessionID);

            try {
              const { tenant: realm, state, return: returnPath } = req.query;
              const newState = state ? 'login-state' : state;
              const newReturnPath = buildReturnPath(returnPath);

              const { codeVerifier, codeChallenge } = generatePKCEChallenge();

              const url = keycloak.buildUrlLogin(
                realm,
                newState,
                codeChallenge,
                `${BASE_URL + mountPoint}/auth/return`,
              );

              req.session.codeChallenge = codeChallenge;
              req.session.codeVerifier = codeVerifier;
              req.session.realm = realm;
              req.session.tenant = realm;
              req.session.returnPath = newReturnPath;

              logger.debug(`auth-route.get: redirect to ${url}`);

              return res.redirect(303, url);
            } catch (e) {
              logger.error('auth-route.get:', e);
              throw e;
            }
          },
        ],
      },
    ],
  };

  /**
   * Called when there is success in the login screen, this endpoint
   * is passed as `redirect_uri` when redirecting to the keycloak login screen
   * and if the login happens
   * correctly the keycloak calls this endpoint.
   * The OAuth2/OIDC protocols are used.
   */
  const authReturn = {
    mountPoint,
    name: 'auth-return-route',
    path: ['/auth/return'],
    handlers: [
      {
        method: 'get',
        middleware: [
          async (req, res) => {
            logger.debug('auth-return-route.get: req.query=', req.query);
            logger.debug('auth-return-route.get: req.sessionID=', req.sessionID);

            const {
              realm,
              codeVerifier,
              returnPath,
            } = req.session;

            if (realm && codeVerifier && returnPath) {
              const {
                state,
                code: authorizationCode,
              } = req.query;

              const redirectUrl = `${BASE_URL}${returnPath}`;
              const url = new URL(redirectUrl);

              try {
                const {
                  accessToken,
                  refreshToken,
                  refreshExpiresAt,
                  accessTokenExpiresAt,
                } = await keycloak.getRequestsInstance().getTokenByAuthorizationCode(
                  realm,
                  authorizationCode,
                  codeVerifier,
                  `${BASE_URL + mountPoint}/auth/return`,
                );

                req.session.accessToken = accessToken;
                req.session.refreshToken = refreshToken;
                req.session.refreshExpiresAt = refreshExpiresAt;
                req.session.accessTokenExpiresAt = accessTokenExpiresAt;

                url.searchParams.append('state', state);

                logger.debug(`auth-return-route.get: redirect to ${redirectUrl} with state=${state}`);
                return res.redirect(303, url.href);
              } catch (e) {
                req.session.destroy((err) => {
                  if (err) { logger.warn('auth-return-route.get:session-destroy-error:', err); }
                });

                url.searchParams.append('error', e.message);

                logger.debug(`auth-return-route.get: redirect to ${redirectUrl} with e=${e}`);
                return res.redirect(303, url.href);
              }
            } else {
              const err = new createError.Unauthorized();
              err.message = 'There is no valid session.';
              throw err;
            }
          },
        ],
      },
    ],
  };

  /**
   *  Returns information from the active session user such as name,
   *  email, tenant (realm) and the permissions associated with that
   *  user using OAuth2/OIDC protocols.
   */
  const authUserInfo = {
    mountPoint,
    name: 'auth-user-info-route',
    path: ['/auth/user-info'],
    handlers: [
      {
        method: 'get',
        middleware: [
          async (req, res) => {
            res.set('Cache-Control', 'no-store');
            logger.debug('auth-user-info-route.get: req.sessionID=', req.sessionID);
            try {
              if (req.session && req.session.realm && req.session.accessToken) {
                const { realm, accessToken } = req.session;

                const permissionsArr = await keycloak.getRequestsInstance()
                  .getPermissionsByToken(realm, accessToken);
                const userInfoObj = await keycloak.getRequestsInstance()
                  .getUserInfoByToken(realm, accessToken);

                const urlAccConfig = keycloak.buildUrlAccConfig(
                  realm,
                );

                const result = {
                  permissions: permissionsArr,
                  ...userInfoObj,
                  urlAcc: urlAccConfig,
                };

                logger.debug(`auth-user-info-route.get: result=${JSON.stringify(result)}`);
                res.status(200).json(result);
              }
            } catch (e) {
              logger.error('device-user-info.get:', e);
              throw e;
            }
          },
        ],
      },
    ],
  };

  /**
   * Revoke the active user session using OAuth2/OIDC protocols and redirects to
   * the keycloak logout url if there is an active session and
   * that keycloak url redirects to `return` with an error query string if there is an error.
   */
  const authRevoke = {
    mountPoint,
    name: 'auth-user-revoke-route',
    path: ['/auth/revoke'],
    handlers: [
      {
        method: 'get',
        middleware: [
          async (req, res) => {
            logger.debug(`auth-user-logout-route.get: req.sessionID=${JSON.stringify(req.sessionID)}`);
            logger.debug('auth-user-logout-route.get: req.query=', req.query);

            const { return: returnPath } = req.query;
            const newReturnPath = buildReturnPath(returnPath);

            try {
              const redirectUrl = `${BASE_URL}${newReturnPath}`;

              if (req.session && req.session.realm) {
                const { realm } = req.session;
                req.session.destroy((err) => {
                  if (err) { logger.warn(`auth-user-logout-route.get: session-destroy-error:=${JSON.stringify(err)}`); }
                });

                const url = keycloak.buildUrlLogout(realm, redirectUrl);
                logger.debug(`auth-user-logout-route.get: redirect to ${url}`);
                return res.redirect(303, url);
              }
              const url = new URL(redirectUrl);
              const e = 'There is no active session';

              url.searchParams.append('error', e);
              logger.debug(`auth-user-logout-route.get: redirect to ${redirectUrl} with error=${e}`);
              return res.redirect(303, url.href);
            } catch (e) {
              logger.error('auth-user-logout-route.get:', e);
              throw e;
            }
          },
        ],
      },
    ],
  };


  return [auth,
    authReturn,
    authUserInfo,
    authRevoke];
};