import * as service from '../../services/service.template.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const deleteTemplates = async (_, { templateIds }, { session, token }) => {
  try {
    const promises = templateIds.map(
      async (templateId) => {
        await service.deleteTemplate(token, templateId);
      },
    );
    await Promise.all(promises);
    return 'ok';
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default deleteTemplates;
