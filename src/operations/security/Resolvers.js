const getCertificateList = require('./query.getCertificateList');

const associateDevice = require('./mutation.associateDevice');
const createCertificate = require('./mutation.createCertificate');
const deleteCertificates = require('./mutation.deleteCertificates');
const disassociateDevice = require('./mutation.disassociateDevice');

const Resolvers = {
  Query: {
    getCertificateList,
  },
  Mutation: {
    associateDevice,
    createCertificate,
    deleteCertificates,
    disassociateDevice,
  },
};

module.exports = Resolvers;
