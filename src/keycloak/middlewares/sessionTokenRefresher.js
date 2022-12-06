import LOG from '../../utils/Log.js';
import { isTokenExpired } from '../../utils/Keycloak.js';
import * as keycloakService from '../../services/service.keycloak.js';

const sessionTokenRefresher = async (req, res, next) => {
  const {
    tenant, refreshToken, tokenCreationTime, accessTokenExpiresIn,
  } = req.session;

  try {
    if (isTokenExpired(tokenCreationTime, accessTokenExpiresIn)) {
      LOG.debug('Access token is expired. Refreshing it ...');
      const { data } = await keycloakService.getTokenByRefreshToken({ tenant, refreshToken });
      LOG.debug('Access token refreshed successfully');

      req.session.tokenCreationTime = Date.now();
      req.session.accessToken = data.access_token;
      req.session.refreshToken = data.refresh_token;
      req.session.accessTokenExpiresIn = data.expires_in;
      req.session.refreshExpiresIn = data.refresh_expires_in;
    }
  } catch (e) {
    LOG.error('Failed to refresh the access token', e);
    return res.status(401).send({ message: 'Failed to refresh the access token' });
  }

  return next();
};

export default sessionTokenRefresher;
