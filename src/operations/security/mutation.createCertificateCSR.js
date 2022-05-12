import * as service from "../../services/service.security.js";
import LOG from '../../utils/Log.js';


const createCertificateCSR = async (_, {csrPEM}, {token}) => {
  try {
    const {data: {certificatePem, certificateFingerprint}} = await service.createCertificate(token, csrPEM);
    const {data: {caPem}} = await service.getCACertificate(token);
    return {
      certificatePem,
      certificateFingerprint,
      caPem
    }

  } catch (e) {
    const {response: {data: {error}}} = e;
    LOG.error(error.stack || error);
    throw error;
  }
}

export default createCertificateCSR;
