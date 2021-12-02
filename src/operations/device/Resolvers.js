const getDeviceById = require('./query.getDeviceById');
const getDevices = require('./query.getDevices');
const getDeviceHistoryForDashboard = require('./query.getDeviceHistoryForDashboard');
const createDevice = require('./mutation.createDevice');
const deleteDevices = require('./mutation.deleteDevices');
const editDevice = require('./mutation.editDevice');

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

module.exports = Resolvers;
