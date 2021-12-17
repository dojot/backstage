const LOG = require('../../utils/Log');
const service = require('../../services/service.security');

const disassociateDevice = async (_, { fingerprint }, { token }) => {
  try {
    await service.disassociateCertificate(token, fingerprint);
    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = disassociateDevice;
