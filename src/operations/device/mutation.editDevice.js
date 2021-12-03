const { snakeCase } = require('lodash');
const LOG = require('../../utils/Log');
const service = require('../../services/service.device');
const { getObjectWithNewKeys } = require('../../utils/Object');

const editDevice = async (_, device, { token }) => {
  try {
    const {
      id, label, templates, attrs,
    } = device;

    const formattedAttrs = attrs ? attrs.map(attr => getObjectWithNewKeys(attr, snakeCase)) : attrs;

    const { data } = await service.editDevice(token, id, {
      label,
      templates,
      attrs: formattedAttrs,
    });

    return data.device;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = editDevice;
