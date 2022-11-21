import * as service from '../../services/service.template.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const deleteTemplateAttrs = async (_, { templateId, attrIds = [] }, { session, token }) => {
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
    HandleResolverError(session, error);
    throw error;
  }
};

export default deleteTemplateAttrs;
