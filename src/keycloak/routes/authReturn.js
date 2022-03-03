import config from '../../config.js';
import * as keycloakService from '../../services/service.keycloak.js';
import Log from '../../utils/Log.js';

const authReturn = async (req, res) => {
  // TODO: Improve error handling
  if (!req.session) throw new Error('There is no valid session.');

  const {
    state: sessionState, tenant, codeVerifier, returnPath,
  } = req.session;

  const { state: receivedState, code: authorizationCode } = req.query;

  // TODO: Check if this is necessary
  // TODO: Improve error handling
  if (sessionState !== receivedState) throw new Error('States are different. Aborting...');

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
        urlToReturn: `${config.backstage_base_url}/auth/return`,
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

    redirectUrl.append('error', error.message);

    return res.redirect(303, redirectUrl.href);
  }
};

export default authReturn;