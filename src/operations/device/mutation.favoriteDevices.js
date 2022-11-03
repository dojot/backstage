import * as service from '../../services/service.favoriteDevice.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const favoriteDevices = async (_, { deviceIds, userName, tenant }, { session }) => {
  try {
    let result;
    const promises = deviceIds.map(
      async (deviceId) => {
        const favoriteDevice = await service.favoriteDevice(deviceId, userName, tenant);

        result = favoriteDevice;
      },
    );

    await Promise.all(promises);

    return result;
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default favoriteDevices;
