const getTemplates = require('./query.getTemplates')
const template = require('./query.template')
const templatesHasImageFirmware = require('./query.templatesHasImageFirmware')

const Resolvers = {
  Query: {
    getTemplates,
    template,
    templatesHasImageFirmware
  },
};

module.exports = Resolvers;
