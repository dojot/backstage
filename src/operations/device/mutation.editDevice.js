import lodash from 'lodash';
import LOG from '../../utils/Log.js';
import * as service from '../../services/service.device.js';
import { getObjectWithNewKeys } from '../../utils/Object.js';

const editDevice = async (_, device, { token }) => {
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
    LOG.error(error.stack || error);
    throw error;
  }
};

export default editDevice;
