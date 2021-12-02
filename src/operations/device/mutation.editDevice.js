const LOG = require('../../utils/Log');
const service = require('../../services/service.device');

const editDevice = async (_, device, { token }) => {
  const {
    id, label, templates, attrs,
  } = device;

  try {
    const { data } = await service.editDevice(token, id, { label, templates, attrs });
    return data.device;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = editDevice;
