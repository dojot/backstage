const axios = require('axios');
const config = require('../config');

const baseURL = config.base_local_url_graphql;
const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `${token}` },
});

const getTemplateById = (token, id) => axios.get(`${baseURL}/template/${id}`, getHeader(token));

const getTemplateWithParams = (token, params) => axios.get(`${baseURL}/template?${params}`, getHeader(token));

const getTemplatesInfo = async (token, ids) => {
  const promises = [];
  const values = [];
  ids.forEach((id) => {
    promises.push(axios.get(`${baseURL}/template/${id}`, getHeader(token)).then((response) => {
      if (response.data) {
        const { data } = response;
        values.push({ id: data.id, label: data.label });
      }
    }).catch(() => Promise.resolve(null)));
  });
  await (Promise.all(promises));
  return values;
};


const deleteTemplate = async (token, id) => axios.delete(`${baseURL}/template/${id}`, getHeader(token));

const createTemplate = async (token, template) => axios.post(`${baseURL}/template`, template, getHeader(token));

const editTemplate = async (token, id, template) => axios.put(`${baseURL}/template/${id}`, template, getHeader(token));

module.exports = {
  getTemplateById,
  getTemplateWithParams,
  getTemplatesInfo,
  deleteTemplate,
  createTemplate,
  editTemplate,
};
