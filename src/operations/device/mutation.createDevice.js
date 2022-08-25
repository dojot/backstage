import lodash from 'lodash';
import LOG from '../../utils/Log.js';
import * as service from '../../services/service.device.js';
import * as securityService from '../../services/service.security.js';
import { getObjectWithNewKeys } from '../../utils/Object.js';

const createDevice = async (_, device, { token }) => {
  try {
    const {
      label = '', id = null, templates = [], attrs = [], fingerprint = '',
    } = device;

    const formattedAttrs = attrs
      ? attrs.map(attr => getObjectWithNewKeys(attr, lodash.snakeCase))
      : attrs;

    const { data } = await service.createDevice(token, {
      label,
      id,
      templates,
      attrs: formattedAttrs,
    });

    if (fingerprint) {
      const [device] = data.devices;
      await securityService.associateCertificate(token, fingerprint, device.id);
    }

    return data.devices;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default createDevice;
