const getDeviceById = require('./query.getDeviceById');
const getDevices = require('./query.getDevices');
const getDeviceHistoryForDashboard = require('./query.getDeviceHistoryForDashboard');
const createDevice = require('./mutation.createDevice');
const deleteDevices = require('./mutation.deleteDevices');

const Resolvers = {
  Query: {
    getDeviceById,
    getDevices,
    getDeviceHistoryForDashboard,
  },
  Mutation: {
    createDevice,
    deleteDevices,
  },
};

module.exports = Resolvers;
