const LOG = require("../../utils/Log");
const service = require('../../services/service.device')

const deleteDevice = async (root, {id}, {token}) => {

  try {
    await service.deleteDevice(token, id);
    return "ok"
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
}

module.exports = deleteDevice;
