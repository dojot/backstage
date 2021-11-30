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

const getTemplatesInfo = async (token, ids) => {
  const promises = [];
  const values = [];
  ids.forEach(id => {
    promises.push(axios.get(`${baseURL}/template/${id}`, getHeader(token)).then(response => {
      if (!!response.data) {
        const {data: {id, label}} = response;
        values.push({id, label})
      }
    }).catch(() => Promise.resolve(null)))
  })
  await (Promise.all(promises));
  return values;
}

module.exports = {
  getTemplateId,
  getTemplateWithParams,
  getTemplatesInfo
};
