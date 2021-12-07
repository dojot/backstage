const LOG = require('../../utils/Log');
const service = require('../../services/service.template');

const duplicateTemplate = async (_, { templateId }, { token }) => {
  try {
    const { data: template } = await service.getTemplateById(token, templateId);

    const newAttrs = template.attrs
      ? template.attrs.map(
        (attr) => {
          const attrClone = { ...attr };
          delete attrClone.template_id;
          delete attrClone.id;
          return attrClone;
        },
      ) : [];


    const { data: savedData } = await service.createTemplate(token, {
      label: `${template.label} - Copy`,
      attrs: newAttrs,
    });

    return savedData.template;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = duplicateTemplate;
