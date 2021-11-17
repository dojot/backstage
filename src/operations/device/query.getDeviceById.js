const {formatValueType} = require("./helpers");
const LOG = require("../../utils/Log");
const service = require('../../services/service.device')

const getDeviceById = async (root, { deviceId }, {token}) => {

  try {
    // const { data: deviceData } = await service.getDeviceById(token, deviceId);
    const ret = await service.getDeviceById(token, deviceId);
    console.log(ret);
    const { data: deviceData } = ret;
    const device = {
      id: deviceData.id,
      label: deviceData.label,
      attrs: []
    }
    Object.keys(deviceData.attrs).forEach((key) => {
      deviceData.attrs[key].forEach((attr) => {
        if( attr.type !== 'dynamic' ) {
          return;
        }
        device.attrs.push({
          label: attr.label,
          valueType: formatValueType(attr.value_type),
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
