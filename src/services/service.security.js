import axios from 'axios';
import config from '../config.js';

const baseURL = config.base_local_url_graphql;

const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `${token}` },
});

export const getAllCertificates = (token, page, filter, id) => {
  const queryParams = {};
  if (page && page.size) queryParams.limit = page.size;
  if (page && page.number) queryParams.page = page.number;
  if (filter && filter.fingerprint) queryParams.fingerprint = filter.fingerprint;
  if (id || id === null) queryParams.keyVal = `belongsTo.device=${id}`;
  const queryParamsString = new URLSearchParams(queryParams).toString();
  return axios.get(`${baseURL}/x509/v1/certificates?${queryParamsString}`, getHeader(token));
};

export const getCertificateByFingerprint = (token, fingerprint) => axios.get(`${baseURL}/x509/v1/certificates/${fingerprint}`, getHeader(token));

export const createCertificate = (token, csrPEM) => axios.post(`${baseURL}/x509/v1/certificates`, { csr: csrPEM }, getHeader(token));

export const registerExternalCertificate = (token, certificateChain) => axios.post(`${baseURL}/x509/v1/certificates`, { certificateChain }, getHeader(token));

export const getCAChain = token => axios.get(`${baseURL}/x509/v1/ca`, getHeader(token));

export const associateCertificate = (token, fingerprint, deviceId) => axios.patch(`${baseURL}/x509/v1/certificates/${fingerprint}`, {
  belongsTo: {
    device: deviceId,
  },
}, getHeader(token));

export const deleteCertificate = async (token, fingerprint) => axios.delete(`${baseURL}/x509/v1/certificates/${fingerprint}`, getHeader(token));

export const disassociateCertificate = async (token, fingerprint) => axios.delete(`${baseURL}/x509/v1/certificates/${fingerprint}/belongsto`, getHeader(token));

export const createCertificationAuthority = async (token, { caPem, allowAutoRegistration }) => axios.post(`${baseURL}/x509/v1/trusted-cas`, { caPem, allowAutoRegistration }, getHeader(token));

export const getCertificationAuthorities = async (token, page, filter) => {
  const queryParams = {};
  if (page && page.size) queryParams.limit = page.size;
  if (page && page.number) queryParams.page = page.number;
  if (filter && filter.caFingerprint) queryParams.caFingerprint = filter.caFingerprint;
  const queryParamsString = new URLSearchParams(queryParams).toString();
  return axios.get(`${baseURL}/x509/v1/trusted-cas?${queryParamsString}`, getHeader(token));
};

export const deleteCertificationAuthority = async (token, fingerprint) => axios.delete(`${baseURL}/x509/v1/trusted-cas/${fingerprint}`, getHeader(token));;
