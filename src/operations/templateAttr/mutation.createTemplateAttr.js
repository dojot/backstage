const { snakeCase } = require('lodash');
const LOG = require('../../utils/Log');
const service = require('../../services/service.template');
const { getObjectWithNewKeys } = require('../../utils/Object');

const createTemplateAttr = async (_, { templateId, attr }, { token }) => {
  try {
    const { data: template } = await service.getTemplateById(token, templateId);

    const dataToSave = {
      ...template,
      attrs: [...template.attrs, getObjectWithNewKeys(attr, snakeCase)],
    };

    const { data: editedTemplate } = await service.editTemplate(
      token,
      templateId,
      dataToSave,
    );

    return editedTemplate.updated;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = createTemplateAttr;
