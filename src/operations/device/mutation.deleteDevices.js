import * as service from '../../services/service.device.js';
import * as favoriteDeviceService from '../../services/service.favoriteDevice.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const deleteDevices = async (_, { deviceIds, userName, tenant }, { token, session }) => {
  try {
    const deleteDevicesPromise = deviceIds.map(async (deviceId) => {
      await favoriteDeviceService.removeFavorite(userName, tenant, deviceId);
    });

    const { data } = await service.deleteMultipleDevice(token, deviceIds);
    await Promise.all(deleteDevicesPromise);
    return { devicesNotFound: data.devices_not_found };
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default deleteDevices;
