const service = require("../../services/service.security");
const LOG = require("../../utils/Log");


const createCertificateCSR = async (_, {csrPEM}, {token}) => {
  try {
    const {data: {certificatePem, certificateFingerprint}} = await service.createCertificate(token, csrPEM);

    return {
      certificatePem,
      certificateFingerprint,
    }

  } catch (e) {
    const {response: {data: {error}}} = e;
    LOG.error(error.stack || error);
    throw error;
  }
}

module.exports = createCertificateCSR;
