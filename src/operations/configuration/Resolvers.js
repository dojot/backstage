const getConfig = require('./query.getConfig')
const updateConfig = require('./mutation.updateConfig')

const Resolvers = {
  Query: {
    getConfig
  },
  Mutation: {
    updateConfig
  }
};

module.exports = Resolvers;
