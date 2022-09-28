import { Blob } from 'buffer';
import LOG from '../../utils/Log.js';

// To implement when the new device manager is ready for integration
const createDevicesCSV = async (_, { csvFile }, { token }) => {
  try {
    const buff = Buffer.from(csvFile, 'base64');

    const blob = new Blob([buff]);

    const params = new URLSearchParams();
    params.append('fileName', blob);

    // TO DO: pass the params for the service when is ready

    const createdDevices = 9;
    const notCreatedDevices = [
      {
        id: '12345',
        label: 'fakeDevice',
        errorMessage: 'error to create this device because...',
      },
    ];

    return { createdDevices, notCreatedDevices };
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default createDevicesCSV;
