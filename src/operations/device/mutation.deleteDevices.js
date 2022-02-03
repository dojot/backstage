import LOG from '../../utils/Log.js';
import * as service from '../../services/service.device.js';

const deleteDevices = async (_, { deviceIds }, { token }) => {
  try {
    const promises = deviceIds.map(
      async (deviceId) => {
        await service.deleteDevice(token, deviceId);
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
