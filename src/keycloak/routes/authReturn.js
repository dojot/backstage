import config from '../../config.js';
import LOG from '../../utils/Log.js';
import * as keycloakService from '../../services/service.keycloak.js';

const authReturn = async (req, res) => {
  if (!req.session.tenant) {
    return res.status(401).send({ message: 'There is no valid session' });
  }

  const {
    state: sessionState, tenant, codeVerifier, returnPath,
  } = req.session;

  LOG.info('Returned from Keycloak. Tenant:', tenant);

  const { state: receivedState, code: authorizationCode } = req.query;

  if (sessionState !== receivedState) {
    return res.status(403).send('Received state does not match the saved one. Aborting...');
  }

  LOG.info('There is a session and the state params are equal');

  const redirectUrl = new URL(`${config.backstage_base_url}${returnPath}`);

  try {
    LOG.info('Trying to exchange the authorization code for an access token');

    const {
      data,
    } = await keycloakService.getTokenByAuthorizationCode(
      {
        tenant,
        codeVerifier,
        authorizationCode,
        urlToReturn: `${config.backstage_base_url}/backstage/auth/return`,
      },
    );

    req.session.tokenCreationTime = Date.now();
    req.session.accessToken = data.access_token;
    req.session.refreshToken = data.refresh_token;
    req.session.accessTokenExpiresIn = data.expires_in;
    req.session.refreshExpiresIn = data.refresh_expires_in;

    LOG.info('Tokens stored in session. Redirecting back to the app...');

    return res.redirect(303, redirectUrl.href);
  } catch (error) {
    LOG.error(error.stack || error);

    req.session.destroy((sessionError) => {
      if (sessionError) LOG.error('Session Destroy Error', sessionError);
    });

    redirectUrl.searchParams.append('error', error.message);

    return res.redirect(303, redirectUrl.href);
  }
};

export default authReturn;
