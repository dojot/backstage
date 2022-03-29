import lodash from 'lodash';
import LOG from '../../utils/Log.js';
import * as service from '../../services/service.favoriteDevice.js';

const favoriteDevices = async (_, { deviceIds }) => {
  try {
    const promises = deviceIds.map(
      async (deviceId) => {
        await service.favoriteDevice(deviceId);
      },
    );

    await Promise.all(promises);

    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default favoriteDevices;
 