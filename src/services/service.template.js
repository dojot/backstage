import axios from 'axios';
import config from '../config.js';

const baseURL = config.base_local_url_graphql;
const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `${token}` },
});

export const getTemplateById = (token, id) => axios.get(`${baseURL}/template/${id}`, getHeader(token));

export const getTemplateWithParams = (token, params) => axios.get(`${baseURL}/template?${params}`, getHeader(token));

export const getTemplatesInfo = async (token, ids) => {
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


export const deleteTemplate = async (token, id) => axios.delete(`${baseURL}/template/${id}`, getHeader(token));

export const createTemplate = async (token, template) => axios.post(`${baseURL}/template`, template, getHeader(token));

export const editTemplate = async (token, id, template) => axios.put(`${baseURL}/template/${id}`, template, getHeader(token));
