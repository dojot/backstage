import axios from 'axios';
import config from '../config.js';

const baseURL = config.graphql_base_url;

const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
});

export const getAllCertificates = ({
  token, page, filter, id, sortBy,
}) => {
  const queryParams = {};
  if (page && page.size) queryParams.limit = page.size;
  if (page && page.number) queryParams.page = page.number;
  if (filter && filter.fingerprint) queryParams.fingerprint = filter.fingerprint;
  if (id || id === null) queryParams.keyVal = `belongsTo.device=${id}`;
  if (sortBy) queryParams.sortBy = sortBy;
  const queryParamsString = new URLSearchParams(queryParams).toString();
  return axios.get(`${baseURL}/x509/v1/certificates?${queryParamsString}`, getHeader(token));
};

export const getCertificateByFingerprint = (token, fingerprint) => axios.get(`${baseURL}/x509/v1/certificates/${fingerprint}`, getHeader(token));

export const createCertificate = (token, csrPEM) => axios.post(`${baseURL}/x509/v1/certificates`, { csr: csrPEM }, getHeader(token));

export const registerExternalCertificate = (token, certificateChain) => axios.post(`${baseURL}/x509/v1/certificates`, { certificateChain }, getHeader(token));

export const getCACertificate = token => axios.get(`${baseURL}/x509/v1/ca`, getHeader(token));

export const associateCertificate = (token, fingerprint, deviceId) => axios.patch(`${baseURL}/x509/v1/certificates/${fingerprint}`, {
  belongsTo: {
    device: deviceId,
  },
}, getHeader(token));

export const deleteCertificate = async (token, fingerprint) => axios.delete(`${baseURL}/x509/v1/certificates/${fingerprint}`, getHeader(token));

export const disassociateCertificate = async (token, fingerprint) => axios.delete(`${baseURL}/x509/v1/certificates/${fingerprint}/belongsto`, getHeader(token));

export const createCertificationAuthority = async (token, { caPem, allowAutoRegistration }) => axios.post(`${baseURL}/x509/v1/trusted-cas`, { caPem, allowAutoRegistration }, getHeader(token));

export const getCertificationAuthorities = async ({
  token, page, filter, sortBy,
}) => {
  const queryParams = {};
  if (page && page.size) queryParams.limit = page.size;
  if (page && page.number) queryParams.page = page.number;
  if (filter && filter.caFingerprint) queryParams.caFingerprint = filter.caFingerprint;
  if (sortBy) queryParams.sortBy = sortBy;
  const queryParamsString = new URLSearchParams(queryParams).toString();
  return axios.get(`${baseURL}/x509/v1/trusted-cas?${queryParamsString}`, getHeader(token));
};

export const deleteCertificationAuthority = async (token, fingerprint) => axios.delete(`${baseURL}/x509/v1/trusted-cas/${fingerprint}`, getHeader(token));

export const importCertificatesInBatch = async (token, {caRoot, certificates}) => {
  // to be implemented when the api is ready
  return 'ok';
};
