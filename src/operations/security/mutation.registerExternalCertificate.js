const service = require("../../services/service.security");
const LOG = require("../../utils/Log");


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

module.exports = registerExternalCertificate;
