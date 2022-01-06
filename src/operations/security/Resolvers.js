const getCertificateList = require('./query.getCertificateList');
const getCertificateById = require('./query.getCertificateById');
const getCertificateByFingerprint = require('./query.getCertificateByFingerprint');
const getCertificationAuthorities = require('./query.getCertificationAuthorities');

const associateDevice = require('./mutation.associateDevice');
const createCertificateOneClick = require('./mutation.createCertificateOneClick');
const createCertificateCSR = require('./mutation.createCertificateCSR');
const deleteCertificates = require('./mutation.deleteCertificates');
const disassociateDevice = require('./mutation.disassociateDevice');
const createCertificationAuthority = require('./mutation.createCertificationAuthority');
const deleteCertificationAuthorities = require('./mutation.deleteCertificationAuthorities');

const Resolvers = {
  Query: {
    getCertificateList,
    getCertificateById,
    getCertificateByFingerprint,
    getCertificationAuthorities,
  },
  Mutation: {
    createCertificateOneClick,
    createCertificateCSR,
    associateDevice,
    disassociateDevice,
    deleteCertificates,
    createCertificationAuthority,
    deleteCertificationAuthorities,
  },
};

module.exports = Resolvers;
