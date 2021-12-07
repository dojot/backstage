const createTemplateAttr = require('./mutation.createTemplateAttr');
const deleteTemplateAttrs = require('./mutation.deleteTemplateAttrs');
const editTemplateAttr = require('./mutation.editTemplateAttr');

const Resolvers = {
  Mutation: {
    createTemplateAttr,
    deleteTemplateAttrs,
    editTemplateAttr,
  },
};

module.exports = Resolvers;
