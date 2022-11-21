import * as deviceService from '../../services/service.device.js';
import * as template from '../../services/service.template.js';
import * as securityService from '../../services/service.security.js';
import config from '../../config.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const getDeviceById = async (_, { deviceId }, { session, token }) => {
  try {
    const { data: deviceData } = await deviceService.getDeviceById(token, deviceId);

    const { data: certificateData } = await securityService.getAllCertificates(
      { token, id: deviceId },
    );

    const device = {
      id: deviceData.id,
      label: deviceData.label,
      attrs: [],
      created: deviceData.created,
      updated: deviceData.updated ? deviceData.updated : '',
      templates: await template.getTemplatesInfo(token, deviceData.templates),
      lastUpdate: [],
      certificate: {
        fingerprint: undefined,
      },
    };

    if (certificateData && certificateData.certificates) {
      const { certificates } = certificateData;
      device.certificate.fingerprint = certificates[0]
        ? certificates[0].fingerprint
        : undefined;
    }

    Object.keys(deviceData.attrs).forEach((key) => {
      deviceData.attrs[key].forEach((attr) => {
        device.attrs.push({
          id: attr.id,
          type: attr.type,
          label: attr.label,
          valueType: attr.value_type,
          templateId: attr.template_id,
          staticValue: attr.static_value,
        });
      });
    });

    device.lastUpdate = config.use_influxdb
      ? await deviceService.getInfluxLastUpdateForDevice(token, deviceData.id, device.attrs)
      : await deviceService.getDeviceHistoricForAllAttrs(token, deviceData.id);

    return device;
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default getDeviceById;
