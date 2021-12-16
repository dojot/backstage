const getCertificateList = require('./query.getCertificateList');

const Resolvers = {
  Query: {
    getCertificateList,
  },
};

module.exports = Resolvers;
