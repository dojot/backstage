import * as service from '../../services/service.security.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const createCertificationAuthority = async (_, { caPem }, { session, token }) => {
  try {
    await service.createCertificationAuthority(token, {
      caPem,
      allowAutoRegistration: false,
    });

    return 'ok';
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default createCertificationAuthority;
