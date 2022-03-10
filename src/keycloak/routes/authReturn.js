import config from '../../config.js';
import Log from '../../utils/Log.js';
import * as keycloakService from '../../services/service.keycloak.js';

const authReturn = async (req, res) => {
  if (!req.session) {
    return res.status(403).send('There is no valid session');
  }

  const {
    state: sessionState, tenant, codeVerifier, returnPath,
  } = req.session;

  const { state: receivedState, code: authorizationCode } = req.query;

  if (sessionState !== receivedState) {
    return res.status(403).send('Received state do not match the saved one. Aborting...');
  }

  const redirectUrl = new URL(`${config.backstage_base_url}${returnPath}`);
  redirectUrl.searchParams.append('state', sessionState);

  try {
    const {
      data,
    } = await keycloakService.getTokenByAuthorizationCode(
      {
        tenant,
        codeVerifier,
        authorizationCode,
        urlToReturn: `${config.backstage_base_url}/backstage/v1/auth/return`,
      },
    );

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: accessTokenExpiresIn,
      refresh_expires_in: refreshExpiresIn,
    } = data;

    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;
    req.session.refreshExpiresIn = refreshExpiresIn;
    req.session.accessTokenExpiresIn = accessTokenExpiresIn;

    return res.redirect(303, redirectUrl.href);
  } catch (error) {
    req.session.destroy((sessionError) => {
      if (sessionError) Log.error(sessionError);
    });

    redirectUrl.searchParams.append('error', error.message);

    return res.redirect(303, redirectUrl.href);
  }
};

export default authReturn;
