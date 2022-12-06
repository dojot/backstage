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

    LOG.debug('Authenticating Tenant:', tenant);
    const formattedReturnPath = getFormattedReturnPath(returnPath);

    const state = randomstring.generate(64);
    const { codeVerifier, codeChallenge } = createPKCEChallenge();

    const searchParams = new URLSearchParams({
      state,
      scope: 'openid',
      response_type: 'code',
      code_challenge: codeChallenge,
      client_id: config.keycloak_client_id,
      redirect_uri: `${config.backstage_base_url}/backstage/auth/return`,
      code_challenge_method: config.keycloak_code_challenge_method,
    });

    const keycloakUrl = getKeycloakUrl(
      {
        tenant,
        searchParams,
        pathSegments: ['auth'],
        baseURL: config.keycloak_external_url,
      },
    );

    // Using express-session to store these data on the server
    req.session.state = state;
    req.session.tenant = tenant;
    req.session.codeVerifier = codeVerifier;
    req.session.codeChallenge = codeChallenge;
    req.session.returnPath = formattedReturnPath;

    LOG.debug('Session created. Redirecting to login...');

    return res.redirect(303, keycloakUrl);
  } catch (error) {
    LOG.error('Failed to authenticate', error);
    return res.status(500).send(error.message);
  }
};

export default authenticate;
