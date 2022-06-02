import LOG from '../../utils/Log.js';
import * as service from '../../services/service.favoriteDevice.js';

const favoriteDevices = async (_, { deviceIds, userName, tenant }) => {
  try {
    let result;
    const promises = deviceIds.map(
      async (deviceId) => {
        const favoriteDevice = await service.favoriteDevice(deviceId, userName, tenant);

        return favoriteDevice;
      },
    );

    await Promise.all(promises);

    return result;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default favoriteDevices;
