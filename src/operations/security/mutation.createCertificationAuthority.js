const LOG = require('../../utils/Log');
const service = require('../../services/service.security');

const createCertificationAuthority = async (_, { name, caPem }, { token }) => {
  try {
    await service.createCertificationAuthority(token, {
      name,
      caPem,
      allowAutoRegistration: false,
    });

    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = createCertificationAuthority;
