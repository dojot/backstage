import axios from 'axios';
import config from '../config.js';

const device_manager_url = config.device_manager_url;
const deviceManagerBatchUrl = config.device_manager_batch_url;

const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
});

export const getTemplateById = (token, id) => axios.get(`${device_manager_url}/template/${id}`, getHeader(token));

export const getTemplateWithParams = (token, params) => axios.get(`${device_manager_url}/template?${params}`, getHeader(token));

export const getTemplatesInfo = async (token, ids) => {
  const promises = [];
  const values = [];
  ids.forEach((id) => {
    promises.push(axios.get(`${device_manager_url}template/${id}`, getHeader(token)).then((response) => {
      if (response.data) {
        const { data } = response;
        values.push({ id: data.id, label: data.label });
      }
    }).catch(() => Promise.resolve(null)));
  });
  await (Promise.all(promises));
  return values;
};


export const deleteTemplate = async (token, id) => axios.delete(`${device_manager_url}/template/${id}`, getHeader(token));


export const deleteMultipleTemplates = async (token, templateIds) => axios.put(`${deviceManagerBatchUrl}/templates_batch`, { templates: templateIds }, getHeader(token));

export const createTemplate = async (token, template) => axios.post(`${device_manager_url}/template`, template, getHeader(token));

export const editTemplate = async (token, id, template) => axios.put(`${device_manager_url}/template/${id}`, template, getHeader(token));
