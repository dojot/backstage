import LOG from '../../utils/Log.js';
import * as service from '../../services/service.template.js';

const deleteMultipleTemplates = async (_, { templateIds }, { token }) => {
  try {
    const { deletedTemplates, notDeletedTemplates } = await service
      .deleteMultipleTemplates(token, templateIds);

    return { deletedTemplates, notDeletedTemplates };
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default deleteMultipleTemplates;
