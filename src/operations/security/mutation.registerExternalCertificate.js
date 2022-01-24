import * as service from "../../services/service.security.js";
import LOG from '../../utils/Log.js';


const registerExternalCertificate = async (_, {certificateChain}, {token}) => {
  try {
    const {data: {certificateFingerprint}} = await service.registerExternalCertificate(token, certificateChain);

    return {
      certificateFingerprint,
    }

  } catch (e) {
    const {response: {data: {error}}} = e;
    LOG.error(error.stack || error);
    throw error;
  }
}

export default registerExternalCertificate;
