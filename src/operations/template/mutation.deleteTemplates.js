import LOG from '../../utils/Log.js';
import * as service from '../../services/service.template.js';

const deleteTemplates = async (_, { templateIds }, { token }) => {
  try {
    const promises = templateIds.map(
      async (templateId) => {
        await service.deleteTemplate(token, templateId);
      },
    );
    await Promise.all(promises);
    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default deleteTemplates;
