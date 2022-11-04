import JSZip from 'jszip';
import * as service from '../../services/service.security.js';
import HandleResolverError from '../../utils/SessionValidation.js';


const createCertificateCSR = async (_, { csrPEM }, { session, token }) => {
  try {
    const {
      data: {
        certificatePem,
        certificateFingerprint,
      },
    } = await service.createCertificate(token, csrPEM);
    const { data: { caPem } } = await service.getCACertificate(token);

    const zip = new JSZip();
    zip.file('certificate.pem', certificatePem);
    zip.file('ca.pem', caPem);

    const certAndKeysAs64 = await zip.generateAsync({ type: 'base64' });

    return {
      certificatePem,
      certificateFingerprint,
      caPem,
      certAndKeysAs64,
    };
  } catch (e) {
    const { response: { data: { error } } } = e;
    HandleResolverError(session, error);
    throw error;
  }
};

export default createCertificateCSR;
