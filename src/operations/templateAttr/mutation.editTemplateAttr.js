import lodash from 'lodash';
import * as service from '../../services/service.template.js';
import { getObjectWithNewKeys } from '../../utils/Object.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const editTemplateAttr = async (_, { templateId, attrId, attr }, { session, token }) => {
  try {
    const { data: template } = await service.getTemplateById(token, templateId);

    const dataToSave = {
      ...template,
      attrs: template.attrs.map((currentAttr) => {
        if (String(currentAttr.id) === String(attrId)) {
          const snakeCaseAttr = getObjectWithNewKeys(attr, lodash.snakeCase);
          return { ...currentAttr, ...snakeCaseAttr };
        }
        return currentAttr;
      }),
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

export default editTemplateAttr;
