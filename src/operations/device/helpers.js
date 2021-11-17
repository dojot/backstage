const _ = require('lodash');
const moment = require('moment');
const {WIDGET_TYPE, SOURCE} = require("../../constants")

const reduceList = (prop) => {
  const array = [];
  Object.keys(prop).forEach(listKey => {
    array.push(
      prop[listKey].reduce((acc, fItem) => {
        const obj = {...fItem};
        Object.keys(obj).forEach(item => {
          acc[item] = obj[item];
        });
        return acc;
      }, {}),
    );
  });
  return array;
};

const convertList = list => _.groupBy(list, item => item.timestamp);

const formatValueType = (valType) => {
  let valueType = '';
  switch (valType) {
    case 'integer':
      valueType = 'NUMBER';
      break;
    case 'float':
      valueType = 'NUMBER';
      break;
    case 'boolean':
    case 'bool':
      valueType = 'BOOLEAN';
      break;
    case 'string':
      valueType = 'STRING';
      break;
    case 'geo:point':
      valueType = 'GEO';
      break;
    default:
      valueType = 'UNDEFINED';
  }
  return valueType;
}

const parseGeo = value => {
  const toParse = value ? value : '[0, 0]';
  const [lat, long] = toParse.split(',')
  return [parseFloat(lat), parseFloat(long)]
}

const generateTemplateKey = (deviceDictionary, device, attr) => {
  if (!_.isEmpty(deviceDictionary) && deviceDictionary[device]) {
    return deviceDictionary[device][attr] ? `${deviceDictionary[device][attr]}${attr}` : undefined;
  }
  return undefined;
}

const parseValue = value => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (isNaN(value)) {
    return value;
  }
  return parseFloat(value);
}

const formatOutPut = (dynamicAttributes, staticAttributes, dojotDevices, deviceDictionary, sourceType, widgetType) => {
  const history = [];
  const historyObj = {};
  dynamicAttributes.forEach(({attr, device_id, value, ts}) => {
    if (widgetType === WIDGET_TYPE.MAP) {
      historyObj[`${device_id}${attr}`] = {
        value: parseGeo(value),
        timestamp: moment(ts).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        deviceLabel: dojotDevices[device_id] ? dojotDevices[device_id].label : 'undefined',
        templateKey: generateTemplateKey(deviceDictionary, device_id, attr),
      }
    } else {
      if (sourceType === SOURCE.DEVICE) {
        history.push({
          [`${device_id}${attr}`]: parseValue(value),
          deviceLabel: dojotDevices[device_id] ? dojotDevices[device_id].label : 'undefined',
          timestamp: moment(ts).utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
        });
      } else {
        history.push({
          [generateTemplateKey(deviceDictionary, device_id, attr)]: parseValue(value),
          deviceLabel: dojotDevices[device_id] ? dojotDevices[device_id].label : 'undefined',
          timestamp: moment(ts).utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
        });
      }

    }
  });

  if (widgetType === WIDGET_TYPE.MAP) {
    Object.values(staticAttributes).forEach(({deviceID, deviceLabel, ...otherProps}) => {
      Object.values(otherProps).forEach(({static_value, created, label}) => {
        historyObj[`${deviceID}${label}`] = {
          value: parseGeo(static_value),
          timestamp: moment(created).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          deviceLabel: deviceLabel,
          templateKey: generateTemplateKey(deviceDictionary, deviceID, label),
        }
      })
    })
  }

  return {history, historyObj}
};

const getStaticAttributes = (dojotDevices, requestedDevices) => {
  const auxStaticAttrs = {};
  requestedDevices.forEach(({deviceID, staticAttrs = []}) => {
    for (const template in dojotDevices[deviceID].attrs) {
      if (dojotDevices[deviceID].attrs.hasOwnProperty(template)) {
        dojotDevices[deviceID].attrs[template].forEach(attribute => {
            if (attribute.type === 'static' && staticAttrs.includes(attribute.label)) {
              if (!auxStaticAttrs[deviceID]) {
                auxStaticAttrs[deviceID] = {deviceID, deviceLabel: dojotDevices[deviceID].label}
              }
              auxStaticAttrs[deviceID][attribute.id] = {...attribute, templateID: template}
            }
          }
        )
      }
    }
  })

  return auxStaticAttrs;
}

module.exports = {
  reduceList,
  convertList,
  formatValueType,
  parseGeo,
  formatOutPut,
  getStaticAttributes,
};
