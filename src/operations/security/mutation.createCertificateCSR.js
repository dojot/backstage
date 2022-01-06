const service = require("../../services/service.security");
const helpers = require("./helpers");
const LOG = require("../../utils/Log");


const createCertificateCSR = async (_, {csrPEM}, {token}) => {
  const hashAlgorithm = 'SHA-256';
  const signAlgorithm = 'RSASSA-PKCS1-V1_5';

  try {
    const {
      privateKeyPEM,
      publicKeyPEM,
    } = await helpers.generateKeyPar(signAlgorithm, hashAlgorithm);

    const {data: {certificatePem, certificateFingerprint}} = await service.createCertificate(token, csrPEM);

    return {
      certificatePem,
      certificateFingerprint,
      privateKeyPEM,
      publicKeyPEM
    }

  } catch (e) {
    const {response: {data: {error}}} = e;
    LOG.error(error.stack || error);
    throw error;
  }
}

module.exports = createCertificateCSR;
