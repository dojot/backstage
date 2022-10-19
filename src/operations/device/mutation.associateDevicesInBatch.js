import LOG from '../../utils/Log.js';
import * as service from '../../services/service.device.js';

const associateDevicesInBatch = async (_, { deviceIdArray }, { token }) => {
  try {
    const {
      associatedDevices,
      devicesWithOtherCertificates,
      notAssociatedDevices,
    } = await service.associateDevicesInBatch(token, deviceIdArray);

    return {
      associatedDevices,
      devicesWithOtherCertificates,
      notAssociatedDevices,
    };
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default associateDevicesInBatch;
