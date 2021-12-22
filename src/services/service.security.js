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

const createCertificate = (token, csrPEM) => axios.post(`${baseURL}/x509/v1/certificates`, { csr: csrPEM }, getHeader(token));

const getCAChain = token => axios.get(`${baseURL}/x509/v1/ca`, getHeader(token));

const associateCertificate = (token, fingerprint, deviceId) => axios.patch(`${baseURL}/x509/v1/certificates/${fingerprint}`, {
  belongsTo: {
    device: deviceId,
  },
}, getHeader(token));

const deleteCertificate = async (token, fingerprint) => axios.delete(`${baseURL}/x509/v1/certificates/${fingerprint}`, getHeader(token));

const disassociateCertificate = async (token, fingerprint) => axios.delete(`${baseURL}/x509/v1/certificates/${fingerprint}/belongsto`, getHeader(token));

const createCertificationAuthority = async (token, { caPem, allowAutoRegistration }) => axios.post(`${baseURL}/x509/v1/trusted-cas`, { caPem, allowAutoRegistration }, getHeader(token));

const getCertificationAuthorities = async (token, page, filter) => {
  const queryParams = {};
  if (page && page.size) queryParams.limit = page.size;
  if (page && page.number) queryParams.page = page.number;
  if (filter && filter.caFingerprint) queryParams.caFingerprint = filter.caFingerprint;
  const queryParamsString = new URLSearchParams(queryParams).toString();
  return axios.get(`${baseURL}/x509/v1/trusted-cas?${queryParamsString}`, getHeader(token));
};

const deleteCertificationAuthority = async (token, fingerprint) => axios.delete(`${baseURL}/x509/v1/trusted-cas/${fingerprint}`, getHeader(token));

module.exports = {
  getAllCertificates,
  createCertificate,
  getCAChain,
  associateCertificate,
  deleteCertificate,
  disassociateCertificate,
  createCertificationAuthority,
  getCertificationAuthorities,
  deleteCertificationAuthority,
};
