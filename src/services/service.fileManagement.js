import axios from 'axios';
import config from '../config.js';

const baseURL = config.file_management_url;

const getHeader = token => ({
  Authorization: `Bearer ${token}`,
});

export const downloadFile = (token, { path, alt }) => {
  const searchParams = new URLSearchParams({ alt, path });

  return axios.get(`${baseURL}/api/v1/files/download?${searchParams.toString()}`, {
    responseType: 'arraybuffer',
    headers: getHeader(token),
  });
};
