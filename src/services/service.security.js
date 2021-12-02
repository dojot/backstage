const axios = require("axios");
const config = require("../config");

const baseURL = config.base_local_url_graphql;
const getHeader = (token) => ({
  headers: {'content-type': 'application/json', Authorization: `${token}`},
})

const getAllCertificates = (token, {number, size}) => {
  return axios.get(`${baseURL}/x509/v1/certificates?page=${number}&limit=${size}`, getHeader(token))
}

module.exports = {
  getAllCertificates,
};
