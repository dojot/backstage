import HandleResolverError from '../../utils/SessionValidation.js';
import * as service from '../../services/service.device.js';

const createMultipleDevices = async (_, devicesParams, { token, session }) => {
  try {
    const {
      devicesPrefix,
      quantity,
      initialSuffixNumber,
      templates,
    } = devicesParams;

    const { data: { devicesWithError } } = await service.createDevicesInBatch(token, {
      devicesPrefix,
      quantity,
      initialSuffixNumber,
      templates,
    });

    return { devicesWithError };
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default createMultipleDevices;
