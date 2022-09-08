import { createClient } from 'redis';

import config from '../config.js';

export const sessionRedisClient = createClient({
  database: 0,
  legacyMode: true,
  url: `${config.redis_host}:${config.redis_port}`,
});
