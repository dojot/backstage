const getDeviceById = require('./query.getDeviceById')
const getDevices = require('./query.getDevices')
const getDeviceHistoryForDashboard = require('./query.getDeviceHistoryForDashboard')
const createDevice = require("./mutation.createDevice")
const deleteDevice = require("./mutation.deleteDevice")

const Resolvers = {
  Query: {
    getDeviceById,
    getDevices,
    getDeviceHistoryForDashboard
  },
  Mutation: {
    createDevice,
    deleteDevice
  }
};

module.exports = Resolvers;
