import getDeviceById from './query.getDeviceById.js';
import getDevices from './query.getDevices.js';
import getDeviceHistoryForDashboard from './query.getDeviceHistoryForDashboard.js';
import createDevice from './mutation.createDevice.js';
import createMultipleDevices from './mutation.createMultipleDevices.js';
import createDevicesCSV from './mutation.createDevicesCSV.js';
import deleteDevices from './mutation.deleteDevices.js';
import editDevice from './mutation.editDevice.js';
import favoriteDevices from './mutation.favoriteDevices.js';
import getFavoriteDevicesList from './query.getFavoriteDevicesList.js';
import associateDevicesInBatch from './mutation.associateDevicesInBatch.js';
import actuate from './mutation.actuate.js';

const Resolvers = {
  Query: {
    getDeviceById,
    getDevices,
    getDeviceHistoryForDashboard,
    getFavoriteDevicesList,
  },
  Mutation: {
    actuate,
    createDevice,
    createMultipleDevices,
    createDevicesCSV,
    deleteDevices,
    editDevice,
    favoriteDevices,
    associateDevicesInBatch,
  },
};

export default Resolvers;
