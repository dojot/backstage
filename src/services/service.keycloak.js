import axios from 'axios';
import config from '../config.js';

const baseURL = config.keycloak_internal_url;

const getUrl = (tenant, ...pathSegments) => {
  const segmentsStr = pathSegments.join('/');
  return `${baseURL}/realms/${tenant}/protocol/openid-connect/${segmentsStr}`;
};

export const getTokenByAuthorizationCode = ({
  tenant, authorizationCode, codeVerifier, urlToReturn,
}) => {
  const url = getUrl(tenant);

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
  const url = getUrl(tenant);

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
  const url = getUrl(tenant);

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
  const url = getUrl(tenant, 'userinfo');

  return axios.post(url, undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
};

export const logout = ({
  tenant, accessToken, refreshToken,
}) => {
  const url = getUrl(tenant, 'logout');

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
