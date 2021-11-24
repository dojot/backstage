const LOG = require("../../utils/Log");
const service = require('../../services/service.device')

const createDevice = async (root, device, {token}) => {
  const {label = "", templates = [], attrs = [], certificate = ""} = device;

  try {
    const {data} = await service.createDevice(token, {label, templates, attrs});
    // Uncomment when the security service will be implemented
    // if (certificate) {
    //   const [device] = deviceRet.devices;
    //   await securityService.associateCertificate(token, certificate, device.id)
    // }

    return data.devices;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
}

module.exports = createDevice;
