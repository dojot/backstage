const getTemplates = require('./query.getTemplates');
const getTemplateById = require('./query.getTemplateById');
const templatesHasImageFirmware = require('./query.templatesHasImageFirmware');

const editTemplate = require('./mutation.editTemplate');
const createTemplate = require('./mutation.createTemplate');
const deleteTemplates = require('./mutation.deleteTemplates');
const duplicateTemplate = require('./mutation.duplicateTemplate');

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
    duplicateTemplate,
  },
};

module.exports = Resolvers;
