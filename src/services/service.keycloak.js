import axios from 'axios';

import config from '../config.js';
import { getKeycloakUrl } from '../utils/Keycloak.js';

const baseURL = config.keycloak_internal_url;

export const getTokenByAuthorizationCode = ({
  tenant, authorizationCode, codeVerifier, urlToReturn,
}) => {
  const url = getKeycloakUrl({ baseURL, tenant });

  const params = new URLSearchParams({
    client_id: config.keycloak_client_id,
    grant_type: 'authorization_code',
    authorizationCode,
    codeVerifier,
    urlToReturn,
  });

  return axios.post(`${url}?${params}`, undefined, { maxRedirects: 0 });
};

export const getTokenByRefreshToken = ({
  tenant, refreshToken,
}) => {
  const url = getKeycloakUrl({ baseURL, tenant });

  const params = new URLSearchParams({
    client_id: config.keycloak_client_id,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  return axios.post(`${url}?${params}`);
};

export const getPermissionsByToken = ({
  tenant, accessToken,
}) => {
  const url = getKeycloakUrl({ baseURL, tenant });

  const params = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
    response_mode: 'permissions',
    audience: 'kong',
  });

  return axios.post(`${url}?${params}`, undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/x-www-form-urlencoded',
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
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
};

export const logout = ({
  tenant, accessToken, refreshToken,
}) => {
  const url = getKeycloakUrl({ baseURL, tenant, pathSegments: ['logout'] });

  const params = new URLSearchParams({
    client_id: config.keycloak_client_id,
    refresh_token: refreshToken,
  });

  return axios.post(`${url}?${params}`, undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
};
