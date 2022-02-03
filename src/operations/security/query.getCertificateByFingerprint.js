import LOG from '../../utils/Log.js';
import * as service from '../../services/service.security.js';

const getCertificateByFingerprint = async (_, { fingerprint }, { token }) => {
  try {
    const ret = await service.getCertificateByFingerprint(token, fingerprint);
    return ret.data;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default getCertificateByFingerprint;
