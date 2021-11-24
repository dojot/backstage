const axios = require("axios");
const config = require("../config");

const baseURL = config.base_local_url_graphql;
const getHeader = (token) => ({
  headers: {'content-type': 'application/json', Authorization: `${token}`},
})

const getTemplateId = (token, id) => {
  return axios.get(`${baseURL}/template/${id}`, getHeader(token))
}

const getTemplateWithParams = (token, params) => {
  return axios.get(`${baseURL}/template?${params}`, getHeader(token))
}

module.exports = {
  getTemplateId,
  getTemplateWithParams
};
