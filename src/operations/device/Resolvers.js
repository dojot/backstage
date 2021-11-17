const getDeviceById = require('./query.getDeviceById')
const getDevices = require('./query.getDevices')
const getDeviceHistoryForDashboard = require('./query.getDeviceHistoryForDashboard')

const Resolvers = {
  Query: {
    getDeviceById,
    getDevices,
    getDeviceHistoryForDashboard
  },
};

module.exports = Resolvers;
