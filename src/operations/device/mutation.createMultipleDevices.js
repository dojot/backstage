import LOG from '../../utils/Log.js';

// To implement when the new device manager is ready for integration
const createMultipleDevices = async (_, devicesParams, { token }) => {
  try {
    const {
      devicesPrefix = '',
      quantity = '',
      initialSuffixNumber = '',
      templates = [],
      attrs = [],
    } = devicesParams;

    LOG.info(devicesPrefix, quantity, initialSuffixNumber, templates, attrs);

    const devicesWithError = true;

    return { devicesWithError };
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default createMultipleDevices;
