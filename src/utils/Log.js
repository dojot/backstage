import log4js from 'log4js';

import config from '../config.js';

log4js.configure({
  appenders: { out: { type: 'stdout', layout: { type: 'basic' } } },
  categories: { default: { appenders: ['out'], level: config.log_level } },
});

const Log = log4js.getLogger('BackStage');

export default Log;
