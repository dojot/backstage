import randomstring from 'randomstring';

import LOG from '../../utils/Log.js';
import config from '../../config.js';
import {
  getKeycloakUrl,
  createPKCEChallenge,
  getFormattedReturnPath,
} from '../../utils/Keycloak.js';


const authenticate = async (req, res) => {
  try {
    const { tenant, returnPath } = req.query;
    const formattedReturnPath = getFormattedReturnPath(returnPath);

    const state = randomstring.generate(64);
    const { codeVerifier, codeChallenge } = createPKCEChallenge();

    const searchParams = new URLSearchParams({
      state,
      scope: 'openid',
      response_type: 'code',
      code_challenge: codeChallenge,
      client_id: config.keycloak_client_id,
      redirect_uri: `${config.backstage_base_url}/auth/return`,
      code_challenge_method: config.keycloak_code_challenge_method,
    });

    const keycloakUrl = getKeycloakUrl(
      {
        baseURL: config.keycloak_external_url,
        tenant,
        searchParams,
      },
    );

    // Using express-session to store these data on the server
    req.session.state = state;
    req.session.tenant = tenant;
    req.session.codeVerifier = codeVerifier;
    req.session.codeChallenge = codeChallenge;
    req.session.returnPath = formattedReturnPath;

    return res.redirect(303, keycloakUrl);
  } catch (error) {
    LOG.error(error.stack || error);
    return res.status(500).send(error.message);
  }
};

export default authenticate;
