const getCertificateList = require('./query.getCertificateList');
const deleteCertificates = require('./mutation.deleteCertificates');

const Resolvers = {
  Query: {
    getCertificateList,
  },
  Mutation: {
    deleteCertificates,
  },
};

module.exports = Resolvers;
