import * as service from '../../services/service.security.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const disassociateDevice = async (_, { fingerprint }, { session, token }) => {
  try {
    await service.disassociateCertificate(token, fingerprint);
    return 'successfully dissociated';
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
}

export default disassociateDevice;
