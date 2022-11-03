import * as service from "../../services/service.security.js";
import HandleResolverError from '../../utils/SessionValidation.js';


const registerExternalCertificate = async (_, { certificateChain }, { session, token }) => {
  try {
    const {data: {certificateFingerprint}} = await service.registerExternalCertificate(token, certificateChain);

    return {
      certificateFingerprint,
    }

  } catch (e) {
    const {response: {data: {error}}} = e;
    HandleResolverError(session, error);
    throw error;
  }
}

export default registerExternalCertificate;
