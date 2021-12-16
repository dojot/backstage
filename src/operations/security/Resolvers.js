const getCertificateList = require('./query.getCertificateList');
const createCertificate = require('./mutation.createCertificate');
const deleteCertificates = require('./mutation.deleteCertificates');

const Resolvers = {
  Query: {
    getCertificateList,
  },
  Mutation: {
    createCertificate,
    deleteCertificates,
  },
};

module.exports = Resolvers;
