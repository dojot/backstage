import config from '../../config.js';
import LOG from '../../utils/Log.js';
import { getKeycloakAccountUrl } from '../../utils/Keycloak.js';
import * as keycloakService from '../../services/service.keycloak.js';

const getUserInfo = async (req, res) => {
  try {
    if (!req.session) {
      return res.status(403).send('There is no active session');
    }

    const { tenant, accessToken } = req.session;

    LOG.info('Trying to get the user info. Tenant:', tenant);

    const { data: permissions } = await keycloakService.getPermissionsByToken({
      tenant,
      accessToken,
    });

    LOG.info('Permissions fetched');

    const { data: userInfo } = await keycloakService.getUserInfoByToken({
      tenant,
      accessToken,
    });

    LOG.info('User info fetched');

    const profile = getKeycloakAccountUrl({
      tenant,
      baseURL: config.keycloak_external_url,
    });

    LOG.info('Profile URL generated. Returning all data to the app...');

    return res.set('Cache-Control', 'no-store').status(200).json({
      tenant,
      profile,
      permissions,
      email: userInfo.email,
      name: userInfo.name || '',
      userName: userInfo.preferred_username,
      emailVerified: userInfo.email_verified,
    });
  } catch (error) {
    LOG.error(error.stack || error);
    return res.status(500).send(error.message);
  }
};

export default getUserInfo;
