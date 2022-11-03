import * as service from '../../services/service.template.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const deleteMultipleTemplates = async (_, { templateIds }, { session, token }) => {
  try {
    const { deletedTemplates, notDeletedTemplates } = await service
      .deleteMultipleTemplates(token, templateIds);

    return { deletedTemplates, notDeletedTemplates };
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default deleteMultipleTemplates;
