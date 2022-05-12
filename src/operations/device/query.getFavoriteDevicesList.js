import LOG from "../../utils/Log.js";
import * as deviceService from "../../services/service.device.js";
import * as favoriteDeviceService from "../../services/service.favoriteDevice.js";

const getFavoriteDevicesList = async (_, { user, tenant }, { token }) => {
  try {
    const promises = [];
    const favoriteDevicesForList = [];

    const favoriteDevices = await favoriteDeviceService.getAllFavoriteDevices(
      user,
      tenant
    );

    favoriteDevices.map((favorite) => {
      promises.push(
        deviceService
          .getDeviceById(token, favorite.device_id)
          .then((response) => {
            favoriteDevicesForList.push(response.data);
          })
      );
    });

    await Promise.all(promises);
    
    return favoriteDevicesForList;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default getFavoriteDevicesList;
