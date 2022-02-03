import * as service from '../../services/service.security.js';
import LOG from '../../utils/Log.js';

const disassociateDevice = async (_, { fingerprint }, { token }) => {
  try {
    await service.disassociateCertificate(token, fingerprint);
    return 'successfully dissociated';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
}

export default disassociateDevice;
