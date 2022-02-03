import createTemplateAttr from './mutation.createTemplateAttr.js';
import deleteTemplateAttrs from './mutation.deleteTemplateAttrs.js';
import editTemplateAttr from './mutation.editTemplateAttr.js';

const Resolvers = {
  Mutation: {
    createTemplateAttr,
    deleteTemplateAttrs,
    editTemplateAttr,
  },
};

export default Resolvers;
