import getDeviceById from './query.getDeviceById.js';
import getDevices from './query.getDevices.js';
import getDeviceHistoryForDashboard from './query.getDeviceHistoryForDashboard.js';
import createDevice from './mutation.createDevice.js';
import deleteDevices from './mutation.deleteDevices.js';
import editDevice from './mutation.editDevice.js';

const Resolvers = {
  Query: {
    getDeviceById,
    getDevices,
    getDeviceHistoryForDashboard,
  },
  Mutation: {
    createDevice,
    deleteDevices,
    editDevice,
  },
};

export default Resolvers;
