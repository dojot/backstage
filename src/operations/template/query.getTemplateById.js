const service = require('../../services/service.template');
const LOG = require('../../utils/Log');

const getTemplateById = async (_, { templateId }, { token }) => {
  try {
    const { data } = await service.getTemplateById(token, templateId);

    const formattedAttrs = data.attrs
      ? data.attrs.map(attr => ({
        id: attr.id,
        type: attr.type,
        label: attr.label,
        valueType: attr.value_type,
        templateId: attr.template_id,
        staticValue: attr.static_value,
        isDynamic: attr.type === 'dynamic',
      }))
      : [];

    return {
      id: data.id,
      label: data.label,
      attrs: formattedAttrs,
    };
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = getTemplateById;
