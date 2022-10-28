import axios from 'axios';
import config from '../config.js';

const baseURL = config.file_management_url;

const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
});

export const downloadFile = (token, { path, alt }) => {
  const searchParams = new URLSearchParams({ alt, path });

  return axios.get(`${baseURL}/api/v1/files/download?${searchParams.toString()}`, getHeader(token));
};
