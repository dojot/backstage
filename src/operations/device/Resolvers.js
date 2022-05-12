import getDeviceById from "./query.getDeviceById.js";
import getDevices from "./query.getDevices.js";
import getDeviceHistoryForDashboard from "./query.getDeviceHistoryForDashboard.js";
import createDevice from "./mutation.createDevice.js";
import deleteDevices from "./mutation.deleteDevices.js";
import editDevice from "./mutation.editDevice.js";
import favoriteDevices from "./mutation.favoriteDevices.js";
import getFavoriteDevicesList from "./query.getFavoriteDevicesList.js";

const Resolvers = {
  Query: {
    getDeviceById,
    getDevices,
    getDeviceHistoryForDashboard,
    getFavoriteDevicesList,
  },
  Mutation: {
    createDevice,
    deleteDevices,
    editDevice,
    favoriteDevices,
  },
};

export default Resolvers;
