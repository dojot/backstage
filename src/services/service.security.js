const axios = require('axios');
const config = require('../config');

const baseURL = config.base_local_url_graphql;

const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `${token}` },
});

const getAllCertificates = (token, page, filter) => {
  const queryParams = {};
  if (page && page.size) queryParams.limit = page.size;
  if (page && page.number) queryParams.page = page.number;
  if (filter && filter.fingerprint) queryParams.fingerprint = filter.fingerprint;
  const queryParamsString = new URLSearchParams(queryParams).toString();

  return axios.get(`${baseURL}/x509/v1/certificates?${queryParamsString}`, getHeader(token));
};

module.exports = {
  getAllCertificates,
};
