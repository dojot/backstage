const LOG = require('../../utils/Log');
const service = require('../../services/service.security');

const getCertificateByFingerprint = async (_, { fingerprint }, { token }) => {
  try {
    const ret = await service.getCertificateByFingerprint(token, fingerprint);
    return ret.data;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = getCertificateByFingerprint;
