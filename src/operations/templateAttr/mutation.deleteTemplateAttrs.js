const LOG = require('../../utils/Log');
const service = require('../../services/service.template');

const deleteTemplateAttrs = async (_, { templateId, attrIds = [] }, { token }) => {
  try {
    const { data: template } = await service.getTemplateById(token, templateId);

    const dataToSave = {
      ...template,
      attrs: template.attrs.filter(attr => !attrIds.includes(String(attr.id))),
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

module.exports = deleteTemplateAttrs;
