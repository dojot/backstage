import * as service from '../../services/service.security.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const associateDevice = async (_, { fingerprint, deviceId }, { session, token }) => {
  try {
    await service.associateCertificate(token, fingerprint, deviceId);
    return 'successfully associated';

  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
}

export default associateDevice;
