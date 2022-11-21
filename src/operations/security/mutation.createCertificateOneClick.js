import JSZip from 'jszip';
import * as service from '../../services/service.security.js';
import * as helpers from './helpers.js';
import HandleResolverError from '../../utils/SessionValidation.js';


const createCertificateOneClick = async (_, { commonName = 'dojot' }, { session, token }) => {
  const hashAlgorithm = 'SHA-256';
  const signAlgorithm = 'RSASSA-PKCS1-V1_5';
  const subjAltCSR = {
    // ex ['localhost', 'localhost2']
    dns: [],
    // ex ['192.168.1.1', '192.168.1.2', '192.168.1.3']
    ip: [],
    // ex ['email@address.com', 'email2@address.com']
    email: [],
  };
  const typesAndValues = {
    organizationUnit: '',
    country: '',
    state: '',
    locality: '',
    organization: '',
  };

  try {
    const {
      privateKeyPEM,
      publicKeyPEM,
      privateKeyPkcs8,
      publicKeyPkcs8,
    } = await helpers.generateKeyPar(signAlgorithm, hashAlgorithm);

    const csrPEM = await helpers.createCSR(
      commonName,
      publicKeyPkcs8,
      privateKeyPkcs8,
      hashAlgorithm,
      typesAndValues,
      subjAltCSR,
    );

    const {
      data: {
        certificatePem,
        certificateFingerprint,
      },
    } = await service.createCertificate(token, csrPEM);

    const { data: { caPem } } = await service.getCACertificate(token);

    const zip = new JSZip();
    zip.file('certificate.pem', certificatePem);
    zip.file('privateKey.pem', privateKeyPEM);
    zip.file('publicKey.pem', publicKeyPEM);
    zip.file('ca.pem', caPem);

    const certAndKeysAs64 = await zip.generateAsync({ type: 'base64' });

    return {
      certificatePem,
      certificateFingerprint,
      privateKeyPEM,
      publicKeyPEM,
      caPem,
      certAndKeysAs64,
    };
  } catch (e) {
    const { response: { data: { error } } } = e;
    HandleResolverError(session, error);
    throw error;
  }
};

export default createCertificateOneClick;
