import LOG from '../../utils/Log.js';
import * as service from '../../services/service.template.js';

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
      created: data.created,
      attrs: formattedAttrs,
    };
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default getTemplateById;
