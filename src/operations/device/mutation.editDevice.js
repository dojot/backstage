import lodash from 'lodash';
import * as service from '../../services/service.device.js';
import { getObjectWithNewKeys } from '../../utils/Object.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const editDevice = async (_, device, { token, session }) => {
  try {
    const {
      id, label, templates, attrs,
    } = device;

    const formattedAttrs = attrs ? attrs.map(attr => getObjectWithNewKeys(attr, lodash.snakeCase)) : attrs;

    const { data } = await service.editDevice(token, id, {
      label,
      templates,
      attrs: formattedAttrs,
    });

    return data.device;
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default editDevice;
