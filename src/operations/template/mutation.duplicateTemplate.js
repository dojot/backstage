import * as service from '../../services/service.template.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const duplicateTemplate = async (_, { templateId }, { session, token }) => {
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
    HandleResolverError(session, error);
    throw error;
  }
};

export default duplicateTemplate;
