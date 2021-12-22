const LOG = require('../../utils/Log');
const service = require('../../services/service.security');

const deleteCertificationAuthorities = async (_, { fingerprints }, { token }) => {
  try {
    const promises = fingerprints.map(
      async (fingerprint) => {
        await service.deleteCertificationAuthority(token, fingerprint);
      },
    );
    await Promise.all(promises);
    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = deleteCertificationAuthorities;
