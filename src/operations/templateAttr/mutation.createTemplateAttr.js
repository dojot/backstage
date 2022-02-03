import lodash from 'lodash';
import LOG from '../../utils/Log.js';
import * as service from '../../services/service.template.js';
import { getObjectWithNewKeys } from '../../utils/Object.js';

const createTemplateAttr = async (_, { templateId, attr }, { token }) => {
  try {
    const { data: template } = await service.getTemplateById(token, templateId);

    const dataToSave = {
      ...template,
      attrs: [...template.attrs, getObjectWithNewKeys(attr, lodash.snakeCase)],
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

export default createTemplateAttr;
