import axios from 'axios';
import config from '../config.js';

const baseURL = config.graphql_base_url;
const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
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


export const deleteMultipleTemplates = async (token, templateIds) => {
  const deletedTemplates = [];
  const notDeletedTemplates = [];

  const promises = templateIds.map(
    async (templateId) => {
      await deleteTemplate(token, templateId)
        .then(async (response) => {
          deletedTemplates.push(response.data.removed);
        })
        .catch(async () => {
          const { data: { label } } = await getTemplateById(token, templateId);
          notDeletedTemplates.push({
            id: templateId,
            label,
            associatedDevices: [{ id: '12345', label: 'Fake Device 1' }, { id: '54321', label: 'Fake Device 2' }],
          });
        });
    },
  );

  await Promise.all(promises);
  return { deletedTemplates, notDeletedTemplates };
};

export const createTemplate = async (token, template) => axios.post(`${baseURL}/template`, template, getHeader(token));

export const editTemplate = async (token, id, template) => axios.put(`${baseURL}/template/${id}`, template, getHeader(token));
