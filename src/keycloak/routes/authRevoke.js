import config from '../../config.js';
import LOG from '../../utils/Log.js';
import { getFormattedReturnPath, getKeycloakUrl } from '../../utils/Keycloak.js';

const authRevoke = async (req, res) => {
  LOG.info('Revoking the current session');

  const { returnPath } = req.query;
  const formattedReturnPath = getFormattedReturnPath(returnPath);
  const redirectUrl = new URL(`${config.backstage_base_url}${formattedReturnPath}`);

  try {
    if (!req.session) {
      redirectUrl.searchParams.append('error', 'There is no active session');
      return res.redirect(303, redirectUrl.href);
    }

    const { tenant } = req.session;

    req.session.destroy((sessionError) => {
      if (sessionError) LOG.error(sessionError);
    });

    const keycloakUrl = getKeycloakUrl({
      tenant,
      pathSegments: ['logout'],
      baseURL: config.keycloak_external_url,
      searchParams: new URLSearchParams({ redirect_uri: redirectUrl.href }),
    });

    LOG.info('Redirecting to Keycloak to logout:', keycloakUrl);

    return res.redirect(303, keycloakUrl);
  } catch (error) {
    LOG.error(error.stack || error);
    return res.redirect(303, redirectUrl.href);
  }
};

export default authRevoke;
