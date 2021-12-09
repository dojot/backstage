const getCertificateList = require('./query.getCertificateList')
const createCertificate = require('./mutation.createCertificate')

const Resolvers = {
  Query: {
    getCertificateList
  },
  Mutation: {
    createCertificate
  }
};

module.exports = Resolvers;
