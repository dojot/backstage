import randomstring from 'randomstring';

import LOG from '../../utils/Log.js';
import config from '../../config.js';
import { createPKCEChallenge, getKeycloakUrl } from '../../utils/Keycloak.js';

const getFormattedReturnPath = (returnPath) => {
  const newReturnPath = returnPath || '/';
  if (newReturnPath.charAt(0) === '/') return newReturnPath;
  return `/${newReturnPath}`;
};

const authenticate = async (req, res) => {
  try {
    const { tenant, returnPath } = req.query;

    const state = randomstring.generate(64);
    const formattedReturnPath = getFormattedReturnPath(returnPath);
    const { codeVerifier, codeChallenge } = createPKCEChallenge();

    const searchParams = new URLSearchParams({
      state,
      scope: 'openid',
      response_type: 'code',
      code_challenge: codeChallenge,
      client_id: config.keycloak_client_id,
      redirect_uri: 'http://localhost:8000/auth/return', // TODO: put in config.js
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
    throw error; // TODO: Improve error handling
  }
};

export default authenticate;
