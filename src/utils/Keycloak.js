import crypto from 'crypto';
import base64url from 'base64url';
import randomstring from 'randomstring';

/**
 * Get an URL to communicate with the Keycloak
 *
 * @param {object} options Options
 * @param {string} options.baseURL Base URL
 * @param {string} options.tenant Tenant
 * @param {Array<string>} options.pathSegments Additional path segments
 * @param {URLSearchParams} options.searchParams Additional path segments
 * @returns {string} Keycloak URL
 */
export const getKeycloakUrl = ({
  baseURL, tenant, pathSegments, searchParams,
}) => {
  const segmentsStr = (pathSegments || []).join('/');
  const urlParams = searchParams ? `?${searchParams}` : '';
  return `${baseURL}/realms/${tenant}/protocol/openid-connect/${segmentsStr}${urlParams}`;
};

/**
 * Create the Proof Key for Code Exchange (PKCE) challenge pair.
 *
 * https://www.oauth.com/oauth2-servers/pkce/authorization-request/
 *
 * @param {string} [hash='sha256']
 * @param {number} [stringSize=128] 43 to 128 characters long.
 * @returns {{codeChallenge:string, codeVerifier:string}} PKCE challenge pair
 */
export const createPKCEChallenge = (hash = 'sha256', codeVerifierSize = 128) => {
  const codeVerifier = randomstring.generate(codeVerifierSize);

  const base64Digest = crypto
    .createHash(hash)
    .update(codeVerifier)
    .digest('base64');

  const codeChallenge = base64url.fromBase64(base64Digest);

  return {
    codeChallenge,
    codeVerifier,
  };
};

/**
 * Format the return path
 *
 * @param {string} returnPath Return path
 * @returns {string} Return path formatted
 */
export const getFormattedReturnPath = (returnPath) => {
  const newReturnPath = returnPath || '/';
  if (newReturnPath.charAt(0) === '/') return newReturnPath;
  return `/${newReturnPath}`;
};


/**
 * Build the Keycloak account URL
 *
 * @param {object} options
 * @param {string} options.baseURL Start URL
 * @param {string} options.tenant Tenant
 * @returns {string} Keycloak account URL
 */
export const getKeycloakAccountUrl = ({
  baseURL,
  tenant,
}) => `${baseURL}/realms/${tenant}/account`;

/**
 * Check if token is expired
 *
 * @param {number} tokenCreationTime Token creation time (milliseconds)
 * @param {number} tokenExpirationInSeconds Token expiration in seconds
 * @returns
 */
export const isTokenExpired = (tokenCreationTime, tokenExpirationInSeconds) => {
  const tokenExpirationInMilliseconds = tokenExpirationInSeconds * 1000;
  const tokenExpirationTime = tokenCreationTime + tokenExpirationInMilliseconds;
  return Date.now() >= tokenExpirationTime;
};
