import * as service from '../../services/service.device.js';
import * as securityService from '../../services/service.security.js';
import * as favoriteDeviceService from '../../services/service.favoriteDevice.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const getDevices = async (root, { page, filter, sortBy }, { token, session }) => {
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

    const certificatePromises = fetchedData.devices.map(device => securityService
      .getAllCertificates({ token, id: device.id }).then((response) => {
        const { certificates } = response.data;

        return certificates[0]
          ? certificates[0].fingerprint
          : undefined;
      }));

    const fingerprints = await Promise.all(certificatePromises);

    const devices = [];
    fetchedData.devices.forEach((device, index) => {
      const attributes = [];

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

      devices.push({
        id: device.id,
        label: device.label,
        created: device.created,
        updated: device.updated ? device.updated : '',
        attrs: attributes,
        certificate: { fingerprint: fingerprints[index] },
      });
    });

    const deviceIds = devices.map(device => device.id);
    const favoriteDevices = await favoriteDeviceService
      .getFavoriteDevicesForDevicesPage(deviceIds);

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
    HandleResolverError(session, error);
    throw error;
  }
};

export default getDevices;
