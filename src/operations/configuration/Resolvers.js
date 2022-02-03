import getConfig from './query.getConfig.js';
import updateConfig from './mutation.updateConfig.js';

const Resolvers = {
  Query: {
    getConfig
  },
  Mutation: {
    updateConfig
  }
};

export default Resolvers;
