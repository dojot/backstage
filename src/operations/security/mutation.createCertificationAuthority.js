import LOG from '../../utils/Log.js';
import * as service from '../../services/service.security.js';

const createCertificationAuthority = async (_, { caPem }, { token }) => {
  try {
    await service.createCertificationAuthority(token, {
      caPem,
      allowAutoRegistration: false,
    });

    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default createCertificationAuthority;
