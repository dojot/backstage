const service = require('../../services/service.device');
const { formatValueType } = require('./helpers');
const LOG = require('../../utils/Log');

const getDevices = async (root, params, { token }) => {
  try {
    const requestParameters = {};

    if (params.page) {
      if (params.page.size) {
        requestParameters.page_size = params.page.size;
      } else {
        requestParameters.page_size = 20;
      }
      if (params.page.number) {
        requestParameters.page_num = params.page.number;
      } else {
        requestParameters.page_num = 1;
      }
    }

    if (params.filter) {
      if (params.filter.label) {
        requestParameters.label = params.filter.label;
      }
    }

    requestParameters.sortBy = params.sortBy || 'label';

    let requestString = '';
    const keys = Object.keys(requestParameters);
    const last = keys[keys.length - 1];
    keys.forEach((element) => {
      if (element === last) {
        requestString += `${element}=${requestParameters[element]}`;
      } else {
        requestString += `${element}=${requestParameters[element]}&`;
      }
    });

    const { data: fetchedData } = await service.getDevicesWithFilter(token, requestString);

    const devices = [];
    fetchedData.devices.forEach((device) => {
      const attributes = [];

      if (device.attrs) {
        Object.keys(device.attrs).forEach((key) => {
          device.attrs[key].forEach((attr) => {
            attributes.push({
              id: attr.id,
              type: attr.type,
              label: attr.label,
              staticValue: attr.static_value,
              isDynamic: attr.type === 'dynamic',
              valueType: formatValueType(attr.value_type),
            });
          });
        });
      }

      devices.push({
        id: device.id,
        label: device.label,
        created: device.created,
        updated: device.updated ? device.updated : '',
        attrs: attributes,
        certificate: {},
      });
    });

    return ({
      totalPages: fetchedData.pagination.total,
      currentPage: fetchedData.pagination.page,
      devices,
    });
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = getDevices;
