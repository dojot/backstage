import lodash from 'lodash';
import * as service from '../../services/service.device.js';
import * as securityService from '../../services/service.security.js';
import { getObjectWithNewKeys } from '../../utils/Object.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const createDevice = async (_, device, { token }, { session }) => {
  try {
    const {
      label = '', disabled, id = null, templates = [], attrs = [], fingerprint = '',
    } = device;

    const formattedAttrs = attrs
      ? attrs.map(attr => getObjectWithNewKeys(attr, lodash.snakeCase))
      : attrs;

    const { data } = await service.createDevice(token, {
      label,
      disabled,
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
    HandleResolverError(session, error);
    throw error;
  }
};

export default createDevice;
