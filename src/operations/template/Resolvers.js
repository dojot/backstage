import getTemplates from './query.getTemplates.js';
import getTemplateById from './query.getTemplateById.js';
import templatesHasImageFirmware from './query.templatesHasImageFirmware.js';

import editTemplate from './mutation.editTemplate.js';
import createTemplate from './mutation.createTemplate.js';
import deleteTemplates from './mutation.deleteTemplates.js';
import deleteMultipleTemplates from './mutation.deleteMultipleTemplates.js';
import duplicateTemplate from './mutation.duplicateTemplate.js';

const Resolvers = {
  Query: {
    getTemplates,
    getTemplateById,
    templatesHasImageFirmware,
  },
  Mutation: {
    editTemplate,
    createTemplate,
    deleteTemplates,
    deleteMultipleTemplates,
    duplicateTemplate,
  },
};

export default Resolvers;
