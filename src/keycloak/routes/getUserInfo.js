import * as keycloakService from '../../services/service.keycloak.js';
import { getKeycloakAccountUrl } from '../../utils/Keycloak.js';

const getUserInfo = async (req, res) => {
  try {
    if (!req.session) {
      return res.status(403).send('There is no active session');
    }

    const { tenant, accessToken } = req.session;

    const permissions = await keycloakService.getPermissionsByToken({
      tenant,
      accessToken,
    });

    const userInfoObj = await keycloakService.getUserInfoByToken({
      tenant,
      accessToken,
    });

    const accountUrl = getKeycloakAccountUrl(
      tenant,
    );

    return res.set('Cache-Control', 'no-store').status(200).json({
      ...userInfoObj,
      permissions,
      accountUrl,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default getUserInfo;
