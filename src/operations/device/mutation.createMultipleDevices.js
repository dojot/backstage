import LOG from '../../utils/Log.js';
import HandleResolverError from '../../utils/SessionValidation.js';

// To implement when the new device manager is ready for integration
const createMultipleDevices = async (_, devicesParams, { token, session }) => {
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
    HandleResolverError(session, error);
    throw error;
  }
};

export default createMultipleDevices;
