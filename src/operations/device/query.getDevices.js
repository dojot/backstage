import * as service from '../../services/service.device.js';
import * as securityService from '../../services/service.security.js';
import * as favoriteDeviceService from '../../services/service.favoriteDevice.js';
import LOG from '../../utils/Log.js';

const getDevices = async (root, { page, filter, sortBy }, { token }) => {
  try {
    const urlParams = new URLSearchParams({
      sortBy: sortBy || 'desc:created',
    });

    if (page) {
      urlParams.append('page_size', page.size || 20);
      urlParams.append('page_num', page.number || 1);
    }

    if (filter) {
      urlParams.append('label', filter.label);
    }

    const { data: fetchedData } = await service.getDevicesWithFilter(
      token,
      urlParams.toString(),
    );

    const devices = [];
    const devicesIds = [];
    const promises = [];

    fetchedData.devices.forEach((device) => {
      const attributes = [];

      devicesIds.push(device.id);

      if (device.attrs) {
        Object.keys(device.attrs).forEach((key) => {
          device.attrs[key].forEach((attr) => {
            attributes.push({
              id: attr.id,
              type: attr.type,
              label: attr.label,
              templateId: attr.template_id,
              staticValue: attr.static_value,
              isDynamic: attr.type === 'dynamic',
              valueType: attr.value_type,
            });
          });
        });
      }

      promises.push(
        securityService
          .getAllCertificates(token, undefined, undefined, device.id)
          .then((response) => {
            const {
              data: { certificates },
            } = response;
            const fingerprint = certificates[0]
              ? certificates[0].fingerprint
              : undefined;
            devices.push({
              id: device.id,
              label: device.label,
              created: device.created,
              updated: device.updated ? device.updated : '',
              attrs: attributes,
              certificate: { fingerprint },
            });
          }),
      );
    });

    await Promise.all(promises);

    const favoriteDevices = await favoriteDeviceService
      .getFavoriteDevicesForDevicesPage(devicesIds);

    const favoriteDevicesObj = {};

    favoriteDevices.forEach((favorite) => {
      favoriteDevicesObj[favorite.device_id] = true;
    });

    const devicesWithFavorites = devices.map((device) => {
      const favorite = !!favoriteDevicesObj[device.id];
      return { ...device, favorite };
    });

    return {
      totalPages: fetchedData.pagination.total,
      currentPage: fetchedData.pagination.page,
      devices: devicesWithFavorites,
    };
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default getDevices;
