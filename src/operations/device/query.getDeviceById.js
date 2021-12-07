const { formatValueType } = require('./helpers');
const LOG = require('../../utils/Log');
const service = require('../../services/service.device');
const template = require('../../services/service.template');

const getDeviceById = async (_, { deviceId }, { token }) => {
  try {
    const { data: deviceData } = await service.getDeviceById(token, deviceId);

    const device = {
      id: deviceData.id,
      label: deviceData.label,
      attrs: [],
      created: deviceData.created,
      updated: deviceData.updated ? deviceData.updated : '',
      templates: await template.getTemplatesInfo(token, deviceData.templates),
      certificate: {},
      lastUpdate: await service.getDeviceHistoricForAllAttrs(token, deviceData.id),
    };

    Object.keys(deviceData.attrs).forEach((key) => {
      deviceData.attrs[key].forEach((attr) => {
        device.attrs.push({
          label: attr.label,
          valueType: formatValueType(attr.value_type),
          id: attr.id,
          type: attr.type,
          templateId: attr.template_id,
          staticValue: attr.static_value,
        });
      });
    });

    return device;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = getDeviceById;
