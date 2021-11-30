const {formatValueType} = require("./helpers");
const LOG = require("../../utils/Log");
const service = require('../../services/service.device')
const template = require('../../services/service.template')

const getDeviceById = async (root, { deviceId }, {token}) => {

  try {
    const ret = await service.getDeviceById(token, deviceId);
    const { data: deviceData } = ret;
    const device = {
      id: deviceData.id,
      label: deviceData.label,
      attrs: [],
      created: deviceData.created,
      updated: deviceData.updated ? deviceData.updated : "",
      templates: await template.getTemplatesInfo(token, deviceData.templates),
      certificate: {}
    }
    Object.keys(deviceData.attrs).forEach((key) => {
      deviceData.attrs[key].forEach((attr) => {
        device.attrs.push({
          label: attr.label,
          valueType: formatValueType(attr.value_type),
          id: attr.id,
          type: attr.type,
          staticValue: attr.static_value,
        });
      });
    });
    return (device);
  } catch( error ) {
    LOG.error(error.stack || error);
    throw error;
  }
}

module.exports = getDeviceById;
