import LOG from '../../utils/Log.js';
import { isTokenExpired } from '../../utils/Keycloak.js';
import * as keycloakService from '../../services/service.keycloak.js';

const sessionTokenRefresher = async (req, _, next) => {
  const {
    tenant, refreshToken, tokenCreationTime, accessTokenExpiresIn,
  } = req.session;

  try {
    if (isTokenExpired(tokenCreationTime, accessTokenExpiresIn)) {
      LOG.info('Access token is expired. Refreshing it ...');
      const { data } = await keycloakService.getTokenByRefreshToken({ tenant, refreshToken });
      LOG.info('Access token refreshed successfully');

      req.session.tokenCreationTime = Date.now();
      req.session.accessToken = data.access_token;
      req.session.refreshToken = data.refresh_token;
      req.session.accessTokenExpiresIn = data.expires_in;
      req.session.refreshExpiresIn = data.refresh_expires_in;
    }
  } catch (e) {
    LOG.info('Failed to refresh the access token');
    LOG.error(e.stack || e);
    return next(e);
  }

  return next();
};

export default sessionTokenRefresher;
