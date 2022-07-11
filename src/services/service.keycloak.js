import axios from 'axios';

import config from '../config.js';
import { getKeycloakUrl } from '../utils/Keycloak.js';

const baseURL = config.keycloak_internal_url;

export const getTokenByAuthorizationCode = ({
  tenant, authorizationCode, codeVerifier, urlToReturn,
}) => {
  const url = getKeycloakUrl({
    baseURL,
    tenant,
    pathSegments: ['token'],
  });

  const params = new URLSearchParams({
    client_id: config.keycloak_client_id,
    grant_type: 'authorization_code',
    code_verifier: codeVerifier,
    redirect_uri: urlToReturn,
    code: authorizationCode,
  });

  return axios.post(url, params.toString(), { maxRedirects: 0 });
};

export const getTokenByRefreshToken = ({
  tenant, refreshToken,
}) => {
  const url = getKeycloakUrl({
    baseURL,
    tenant,
    pathSegments: ['token'],
  });

  const params = new URLSearchParams({
    client_id: config.keycloak_client_id,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  return axios.post(url, params.toString());
};

export const getPermissionsByToken = ({
  tenant, accessToken,
}) => {
  const url = getKeycloakUrl({
    baseURL,
    tenant,
    pathSegments: ['token'],
  });

  const params = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
    response_mode: 'permissions',
    audience: 'kong',
  });

  return axios.post(url, params.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getUserInfoByToken = ({
  tenant, accessToken,
}) => {
  const url = getKeycloakUrl({ baseURL, tenant, pathSegments: ['userinfo'] });

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const logout = ({
  tenant, accessToken, refreshToken,
}) => {
  const url = getKeycloakUrl({
    baseURL,
    tenant,
    pathSegments: ['logout'],
  });

  const params = new URLSearchParams({
    client_id: config.keycloak_client_id,
    refresh_token: refreshToken,
  });

  return axios.post(url, params.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
