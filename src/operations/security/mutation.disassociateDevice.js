const service = require('../../services/service.security');
const LOG = require('../../utils/Log');

const disassociateDevice = async (_, { fingerprint }, { token }) => {
  try {
    await service.disassociateCertificate(token, fingerprint);
    return 'successfully dissociated';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
}

module.exports = disassociateDevice;
