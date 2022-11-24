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

    const response = await service.createDevicesInBatch(token, {
      devicesPrefix,
      quantity,
      initialSuffixNumber,
      templates,
    });

    console.log(response);

    const devicesWithError = true;

    return { devicesWithError };
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default createMultipleDevices;
