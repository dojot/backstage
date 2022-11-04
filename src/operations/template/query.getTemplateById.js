import * as service from '../../services/service.template.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const getTemplateById = async (_, { templateId }, { session, token }) => {
  try {
    const { data } = await service.getTemplateById(token, templateId);

    const formattedAttrs = data.attrs
      ? data.attrs.map(attr => ({
        id: attr.id,
        type: attr.type,
        label: attr.label,
        created: attr.created,
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
    HandleResolverError(session, error);
    throw error;
  }
};

export default getTemplateById;
