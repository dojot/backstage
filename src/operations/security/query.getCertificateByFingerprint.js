import * as service from '../../services/service.security.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const getCertificateByFingerprint = async (_, { fingerprint }, { session, token }) => {
  try {
    const ret = await service.getCertificateByFingerprint(token, fingerprint);
    return ret.data;
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default getCertificateByFingerprint;
