import getCertificateList from './query.getCertificateList.js';
import getCertificateById from './query.getCertificateById.js';
import getCertificateByFingerprint from './query.getCertificateByFingerprint.js';
import getCertificationAuthorities from './query.getCertificationAuthorities.js';

import associateDevice from './mutation.associateDevice.js';
import createCertificateOneClick from './mutation.createCertificateOneClick.js';
import createCertificateCSR from './mutation.createCertificateCSR.js';
import registerExternalCertificate from './mutation.registerExternalCertificate.js';
import deleteCertificates from './mutation.deleteCertificates.js';
import disassociateDevice from './mutation.disassociateDevice.js';
import createCertificationAuthority from './mutation.createCertificationAuthority.js';
import deleteCertificationAuthorities from './mutation.deleteCertificationAuthorities.js';
import importCertificatesInBatch from './mutation.importCertificatesInBatch.js';

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
    registerExternalCertificate,
    importCertificatesInBatch,
  },
};

export default Resolvers;
