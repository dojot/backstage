const axios = require("axios");
const config = require("../config");

const baseURL = config.base_local_url_graphql;
const getHeader = (token) => ({
  headers: {'content-type': 'application/json', Authorization: `${token}`},
})

const getDeviceById = (token, id) => {
  return axios.get(`${baseURL}/device/${id}`, getHeader(token))
}

const getDeviceList = async (token, ids) => {
  const promises = [];
  const values = {};
  ids.forEach(deviceId => {
    const promise = axios.get(`${baseURL}/device/${deviceId}`, getHeader(token)).then((response) => {
      if (!!response.data) {
        const {data: {attrs, created, id, label, templates}} = response;
        values[id] = {attrs, created, id, label, templates, templateID: null}
      }
    }).catch(() => Promise.resolve(null));
    promises.push(promise);
  })

  await (Promise.all(promises));
  return values;
}

const getDevicesWithFilter = async (token, params) => {
  return axios.get(`${baseURL}/device?${params}`, getHeader(token))
}

const getHistoryFromDevices = async (token, devices, params = '') => {
  const promises = [];
  const attributes = [];
  devices.forEach(({deviceID, dynamicAttrs}) => {
    if (dynamicAttrs) {
      dynamicAttrs.forEach((attribute) => {
        const promise = axios.get(`${baseURL}/history/device/${deviceID}/history?attr=${attribute}${params}`, getHeader(token))
          .then((response) => {
            if (!!response.data && Array.isArray(response.data)) {
              attributes.push(...response.data)
            }
          }).catch(() => Promise.resolve(null));
        promises.push(promise);
      })
    }
  })
  await (Promise.all(promises));
  return attributes;
}

const getDevicesByTemplate = async (token, templates) => {
  const promises = [];
  const values = {};
  const devicesIDs = [];
  let deviceDictionary = {};
  Object.values(templates).forEach(({templateID, dynamicAttrs, staticAttrs}) => {
    const promise = axios.get(`${baseURL}/device/template/${templateID}`, getHeader(token)).then((response) => {
      if (!!response.data) {
        const {data: {devices = []}, config: {url}} = response;
        const templateId = url.split("/").pop()
        devices.forEach(device => {
          const {id, label, created, attrs, templates} = device;
          if (!deviceDictionary[id]) {
            deviceDictionary[id] = {};
          }
          dynamicAttrs.forEach(attribute => {
            if (!deviceDictionary[id][attribute]) {
              deviceDictionary[id][attribute] = templateId;
            }
          })
          staticAttrs.forEach(attribute => {
            if (!deviceDictionary[id][attribute]) {
              deviceDictionary[id][attribute] = templateId;
            }
          })

          devicesIDs.push({deviceID: id, dynamicAttrs, staticAttrs});
          values[id] = {attrs, created, id, label, templates}
        })
      }
    }).catch(() => Promise.resolve(null));
    promises.push(promise);
  })
  await (Promise.all(promises));
  return {values, devicesIDs, deviceDictionary};
}

module.exports = {
  getDeviceById,
  getDeviceList,
  getHistoryFromDevices,
  getDevicesByTemplate,
  getDevicesWithFilter
};
