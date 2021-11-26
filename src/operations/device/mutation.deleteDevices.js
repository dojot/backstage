const LOG = require('../../utils/Log');
const service = require('../../services/service.device');

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

module.exports = deleteDevices;
