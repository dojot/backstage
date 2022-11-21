import * as service from '../../services/service.security.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const deleteCertificationAuthorities = async (_, { fingerprints }, { session, token }) => {
  try {
    const promises = fingerprints.map(
      async (fingerprint) => {
        await service.deleteCertificationAuthority(token, fingerprint);
      },
    );
    await Promise.all(promises);
    return 'ok';
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default deleteCertificationAuthorities;
