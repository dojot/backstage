import * as service from '../../services/service.device.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const actuate = async (_, device, { token, session }) => {
  try {
    const { deviceId, labels, values } = device;

    const attrs = {};
    labels.forEach((label, index) => {
      attrs[label] = values[index];
    });

    const { data } = await service.actuate(token, deviceId, { attrs });

    return data.status;
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default actuate;
