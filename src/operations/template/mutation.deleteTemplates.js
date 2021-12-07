const LOG = require('../../utils/Log');
const service = require('../../services/service.template');

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

module.exports = deleteTemplates;
