const { snakeCase } = require('lodash');
const LOG = require('../../utils/Log');
const service = require('../../services/service.device');
const { getObjectWithNewKeys } = require('../../utils/Object');

const createDevice = async (_, device, { token }) => {
  try {
    const {
      label = '', templates = [], attrs = [], certificate = '',
    } = device;

    const formattedAttrs = attrs
      ? attrs.map(attr => getObjectWithNewKeys(attr, snakeCase))
      : attrs;

    const { data } = await service.createDevice(token, {
      label,
      templates,
      attrs: formattedAttrs,
    });

    // Uncomment when the security service will be implemented
    // eslint-disable-next-line no-console
    console.log('Certificate:', certificate);
    // if (certificate) {
    //   const [device] = deviceRet.devices;
    //   await securityService.associateCertificate(token, certificate, device.id)
    // }

    return data.devices;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = createDevice;
