import LOG from '../../utils/Log.js';
import * as service from '../../services/service.security.js';

const deleteCertificates = async (_, { fingerprints }, { token }) => {
  try {
    const promises = fingerprints.map(
      async (fingerprint) => {
        await service.deleteCertificate(token, fingerprint);
      },
    );
    await Promise.all(promises);
    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default deleteCertificates;
