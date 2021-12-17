const { snakeCase } = require('lodash');
const LOG = require('../../utils/Log');
const service = require('../../services/service.device');
const securityService = require('../../services/service.security');
const { getObjectWithNewKeys } = require('../../utils/Object');

const createDevice = async (_, device, { token }) => {
  try {
    const {
      label = '', templates = [], attrs = [], fingerprint = '',
    } = device;

    const formattedAttrs = attrs
      ? attrs.map(attr => getObjectWithNewKeys(attr, snakeCase))
      : attrs;

    const { data } = await service.createDevice(token, {
      label,
      templates,
      attrs: formattedAttrs,
    });

    if (fingerprint) {
      const [device] = data.devices;
      await securityService.associateCertificate(token, fingerprint, device.id)
    }

    return data.devices;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = createDevice;
