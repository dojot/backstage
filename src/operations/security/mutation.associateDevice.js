import * as service from '../../services/service.security.js';
import LOG from '../../utils/Log.js';

const associateDevice = async (_, { fingerprint, deviceId }, { token }) => {
  try {
    await service.associateCertificate(token, fingerprint, deviceId);
    return 'successfully associated';

  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
}

export default associateDevice;
