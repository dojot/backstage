import axios from 'axios';
import config from '../config.js';
import LOG from '../utils/Log.js';

const baseURL = config.graphql_base_url;
const deviceManagerUrl = config.device_manager_batch_url;

const getHeader = (token) => ({
  headers: {'content-type': 'application/json', Authorization: `Bearer ${token}`},
})

export const getDeviceById = (token, id) => axios.get(`${baseURL}/device/${id}`, getHeader(token));

export const getDeviceList = async (token, ids) => {
  const promises = [];
  const values = {};
  ids.forEach((deviceId) => {
    const promise = axios.get(`${baseURL}/device/${deviceId}`, getHeader(token)).then((response) => {
      if (response.data) {
        const {
          data: {
            attrs, created, id, label, templates,
          },
        } = response;
        values[id] = {
          attrs, created, id, label, templates, templateID: null,
        };
      }
    }).catch(() => Promise.resolve(null));
    promises.push(promise);
  });

  await (Promise.all(promises));
  return values;
};

export const getDevicesWithFilter = async (token, params) => axios.get(`${baseURL}/device?${params}`, getHeader(token));

export const getHistoryFromDevices = async (token, devices, params = '') => {
  const promises = [];
  const attributes = [];
  devices.forEach(({ deviceID, dynamicAttrs }) => {
    if (dynamicAttrs) {
      dynamicAttrs.forEach((attribute) => {
        const promise = axios.get(`${baseURL}/history/device/${deviceID}/history?attr=${attribute}${params}`, getHeader(token))
          .then((response) => {
            if (!!response.data && Array.isArray(response.data)) {
              attributes.push(...response.data);
            }
          }).catch(() => Promise.resolve(null));
        promises.push(promise);
      });
    }
  });
  await (Promise.all(promises));
  return attributes;
};

export const getInfluxDataFromDevices = async (token, devices, params) => {
  const promises = [];
  const attributes = [];

  devices.forEach(({deviceID, dynamicAttrs}) => {
    if (dynamicAttrs) {
      dynamicAttrs.forEach((attr) => {
        const promise = axios.get(
          `${baseURL}/tss/v1/devices/${deviceID}/attrs/${attr}/data?order=desc${params}`,
          getHeader(token)
        ).then((response) => {
          if (!!response.data.data && Array.isArray(response.data.data)) {
            response.data.data.forEach(attrItems => {
                attributes.push(
              {
                attr,
                // We don't have the metadata on InfluxDB, but its here just to ensure
                // that this function returns the same data as getHistoryFromDevices
                metadata: {},
                device_id: deviceID,
                ...attrItems,
              });
            });
          }
        }).catch(() => Promise.resolve(null));
        promises.push(promise);
      });
    }
  });
  await (Promise.all(promises));
  return attributes;
}

export const getDevicesByTemplate = async (token, templates) => {
  const promises = [];
  const values = {};
  const devicesIDs = [];
  const deviceDictionary = {};
  Object.values(templates).forEach(({ templateID, dynamicAttrs, staticAttrs }) => {
    const promise = axios.get(`${baseURL}/device/template/${templateID}`, getHeader(token)).then((response) => {
      if (response.data) {
        const { data: { devices = [] }, config: { url } } = response;
        const templateId = url.split('/').pop();
        devices.forEach((device) => {
          const {
            id, label, created, attrs, templates,
          } = device;
          if (!deviceDictionary[id]) {
            deviceDictionary[id] = {};
          }
          dynamicAttrs.forEach((attribute) => {
            if (!deviceDictionary[id][attribute]) {
              deviceDictionary[id][attribute] = templateId;
            }
          });
          staticAttrs.forEach((attribute) => {
            if (!deviceDictionary[id][attribute]) {
              deviceDictionary[id][attribute] = templateId;
            }
          });

          devicesIDs.push({ deviceID: id, dynamicAttrs, staticAttrs });
          values[id] = {
            attrs, created, id, label, templates,
          };
        });
      }
    }).catch(() => Promise.resolve(null));
    promises.push(promise);
  });
  await (Promise.all(promises));
  return { values, devicesIDs, deviceDictionary };
};

export const createDevice = async (token, data) => axios.post(`${baseURL}/device`, data, getHeader(token));

export const createDevicesInBatch = async (token, data) => axios.post(`${baseURL}/device/batch`, data, getHeader(token));

export const deleteDevice = async (token, id) => axios.delete(`${baseURL}/device/${id}`, getHeader(token));

export const deleteMultipleDevice = async (token, deviceIds) => axios.put(`${deviceManagerUrl}/devices_batch`, { devices: deviceIds }, getHeader(token));

export const getDeviceHistoricForAllAttrs = async (token, deviceId) => {
  const values = [];
  try {
    const response = await axios.get(`${baseURL}/history/device/${deviceId}/history?lastN=1`, getHeader(token));
    if (response.data) {
      for (const key in response.data) {
        values.push({
          label: key,
          value: response.data[key].length > 0 ? String(response.data[key][0].value) : null,
          date: response.data[key].length > 0 ? response.data[key][0].ts : null,
        });
      }
    }
    return values;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export const getInfluxLastUpdateForDevice = async (token, deviceId, attrs) => {
  const promises = [];
  const values = [];
    attrs.forEach((attr) => {
      const promise = axios.get(
        `${baseURL}/tss/v1/devices/${deviceId}/attrs/${attr.label}/data?limit=1`,
        getHeader(token),
      ).then((response) => {
        const [firstAttrData] = response.data;
        const { ts, value } = firstAttrData || {};
        values.push({
          value,
          date: ts,
          label: attr.label,
        });
      }).catch(() => {
        values.push({
          value: undefined,
          date: undefined,
          label: attr.label,
        });
        Promise.resolve(null);
      });
      promises.push(promise);
    });

  await Promise.all(promises);
  return values;
};

export const editDevice = async (token, id, data) => axios.put(`${baseURL}/device/${id}`, data, getHeader(token));

export const associateDevicesInBatch = async (token, { deviceIdArray }) => ({
  associatedDevices: [
    {
      label: 'fake device 1',
    },
  ],
  devicesWithOtherCertificates: [
    {
      label: 'fake device 2',
    },
  ],
  notAssociatedDevices: [
    {
      label: 'fake device 3',
    },
  ],
});

export const actuate = async (token, id, data) => axios.put(`${baseURL}/device/${id}/actuate`, data, getHeader(token));
