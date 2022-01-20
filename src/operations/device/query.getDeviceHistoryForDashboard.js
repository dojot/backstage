import {
  getStaticAttributes,
  formatOutPut,
  reduceList,
  convertList
} from './helpers.js';
import * as service from '../../services/service.device.js';
import {OPERATION, SOURCE, WIDGET_TYPE} from '../../constants/index.js';
import moment from 'moment';
import LOG from '../../utils/Log.js';
import lodash from 'lodash';


const getDeviceHistoryForDashboard = async (
  root,
  props,
  context,
) => {
  const {token} = context;
  const {
    filter: {dateFrom = '', dateTo = '', lastN = '1', devices = [], templates = []},
    configs: {sourceType = SOURCE.DEVICE, operationType = OPERATION.LAST.N, widgetType = WIDGET_TYPE.DEFAULT}
  } = props;
  let sortedHistory = [];
  let queryStringParams = '';
  let dynamicAttrs = [];
  let staticAttrs = [];
  let dojotDevices = {};
  let devicesFromTemplate = [];
  let deviceDictionary = {};

  switch (operationType) {
    case OPERATION.LAST.N:
      // To get the latest N records
      queryStringParams += `${lastN && `&lastN=${lastN}`}`;
      break;
    case OPERATION.LAST.MINUTES:
      // To get the data for the last minutes
      queryStringParams += `&dateFrom=${moment().subtract(lastN, 'minute').toISOString()}`;
      break;
    case OPERATION.LAST.HOURS:
      // To get the data for the last hours
      queryStringParams += `&dateFrom=${moment().subtract(lastN, 'hour').toISOString()}`;
      break;
    case OPERATION.LAST.DAYS:
      // To get the data for the last days
      queryStringParams += `&dateFrom=${moment().subtract(lastN, 'days').toISOString()}`;
      break;
    case OPERATION.LAST.MOUTHS:
      // To get the data for the last months
      queryStringParams += `&dateFrom=${moment().subtract(lastN, 'month').toISOString()}`;
      break;
    default:
      // Standard option is to get data by time window
      queryStringParams = `${dateFrom && `&dateFrom=${dateFrom}`}${dateTo && `&dateTo=${dateTo}`}`;
      break;
  }
  try {
    switch (sourceType) {
      case SOURCE.DEVICE:
        const devicesIds = devices.map(device => device.deviceID)
        dojotDevices = await service.getDeviceList(token, devicesIds)
        dynamicAttrs = await service.getHistoryFromDevices(token, devices, queryStringParams)
        break;
      case SOURCE.TEMPLATE:
        const ret = await service.getDevicesByTemplate(token, templates)
        dojotDevices = ret.values;
        devicesFromTemplate = ret.devicesIDs;
        deviceDictionary = ret.deviceDictionary;
        dynamicAttrs = await service.getHistoryFromDevices(token, devicesFromTemplate, queryStringParams)
        break;
      default:
        dojotDevices = {}
        break;
    }

    if (widgetType === WIDGET_TYPE.MAP || widgetType === WIDGET_TYPE.TABLE) {
      if (sourceType === SOURCE.DEVICE) {
        staticAttrs = getStaticAttributes(dojotDevices, devices)
      }
      if (sourceType === SOURCE.TEMPLATE) {
        staticAttrs = getStaticAttributes(dojotDevices, devicesFromTemplate)
      }
    }
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }

  const {
    history,
    historyObj
  } = formatOutPut(dynamicAttrs, staticAttrs, dojotDevices, deviceDictionary, sourceType, widgetType);

  if (widgetType === WIDGET_TYPE.MAP) {
    return JSON.stringify(historyObj);
  }

  sortedHistory = lodash.orderBy(history, o => moment(o.timestamp).format('YYYYMMDDHHmmss'), ['asc']);

  return JSON.stringify(reduceList(convertList(sortedHistory)));
}

export default getDeviceHistoryForDashboard;
