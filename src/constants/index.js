const OPERATION = Object.freeze({
  LAST: {
    MOUTHS: 4,
    DAYS: 3,
    HOURS: 2,
    MINUTES: 1,
    N: 0,
  },
  DATE_RANGE: 5,
});

const WIDGET_TYPE = Object.freeze({
  DEFAULT: 0,
  MAP: 8,
  TABLE: 7,
});

const SOURCE = Object.freeze({
  DEVICE: 0,
  TEMPLATE: 1,
});

const RESERVED_LABEL_IMG = Object.freeze(['dojot:firmware_update:desired_version', 'dojot:firmware_update:version', 'dojot:firmware_update:update', 'dojot:firmware_update:update_result', 'dojot:firmware_update:state']);


module.exports = {
  OPERATION,
  WIDGET_TYPE,
  SOURCE,
  RESERVED_LABEL_IMG
};
