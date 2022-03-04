import config from '../../config.js';
import Log from '../../utils/Log.js';
import { getFormattedReturnPath, getKeycloakUrl } from '../../utils/Keycloak.js';

const authRevoke = async (req, res) => {
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
      if (sessionError) Log.error(sessionError);
    });

    const keycloakUrl = getKeycloakUrl({
      tenant,
      baseURL: config.keycloak_external_url,
      searchParams: new URLSearchParams({ redirect_uri: redirectUrl.href }),
    });

    return res.redirect(303, keycloakUrl);
  } catch (error) {
    return res.redirect(303, redirectUrl.href);
  }
};

export default authRevoke;
