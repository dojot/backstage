const service = require('../../services/service.security');
const LOG = require('../../utils/Log');

const associateDevice = async (_, { fingerprint, deviceId }, { token }) => {
  try {
    await service.associateCertificate(token, fingerprint, deviceId);
    return 'successfully associated';

  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
}

module.exports = associateDevice;
