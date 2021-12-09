const axios = require("axios");
const config = require("../config");

const baseURL = config.base_local_url_graphql;
const getHeader = (token) => ({
  headers: {'content-type': 'application/json', Authorization: `${token}`},
})

const getAllCertificates = (token, {number, size}) => {
  return axios.get(`${baseURL}/x509/v1/certificates?page=${number}&limit=${size}`, getHeader(token))
}

const createCertificate = (token, csrPEM) => {
  return axios.post(`${baseURL}/x509/v1/certificates`, {csr: csrPEM}, getHeader(token))
}

const getCAChain = (token) => {
  return axios.get(`${baseURL}/x509/v1/ca`, getHeader(token))
}

const associateCertificate = (token, fingerPrint, deviceId) => {
  return axios.patch(`${baseURL}/x509/v1/certificates/${fingerPrint}`, {
    belongsTo: {
      device: deviceId,
    },
  }, getHeader(token))
}

module.exports = {
  getAllCertificates,
  createCertificate,
  getCAChain,
  associateCertificate
};
