import { Blob } from 'buffer';
import LOG from '../../utils/Log.js';
import * as service from '../../services/service.security.js';

const importCertificatesInBatch = async (_, { caRoot, certificates }, { token }) => {
  try {
    const caRootBuff = Buffer.from(caRoot, 'base64');
    const caRootBlob = new Blob([caRootBuff]);

    const certificatesBuff = Buffer.from(certificates, 'base64');
    const certificatesBlob = new Blob([certificatesBuff]);

    const params = new URLSearchParams();

    params.append('filename_ca_raiz', caRootBlob);
    params.append('filename_certificates', certificatesBlob);

    await service.importCertificatesInBatch(token, {
      params,
    });

    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default importCertificatesInBatch;
