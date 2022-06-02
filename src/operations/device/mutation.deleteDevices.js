import LOG from '../../utils/Log.js';
import * as service from '../../services/service.device.js';
import * as favoriteDeviceService from '../../services/service.favoriteDevice.js';

const deleteDevices = async (_, { deviceIds, userName, tenant }, { token }) => {
  try {
    const promises = deviceIds.map(
      async (deviceId) => {
        await service.deleteDevice(token, deviceId);
        await favoriteDeviceService.removeFavorite(userName, tenant, deviceId);
      },
    );
    await Promise.all(promises);
    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default deleteDevices;
