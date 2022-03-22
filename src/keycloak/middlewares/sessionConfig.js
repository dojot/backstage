import session from 'express-session';
import connectRedis from 'connect-redis';

import config from '../../config.js';

const RedisStore = connectRedis(session);

const sessionConfig = sessionRedisClient => session({
  secret: config.session_secret,
  name: config.session_cookie_name,
  domain: config.session_domain,
  proxy: config.session_proxy,
  resave: false,
  rolling: true, // Makes the cookie.maxAge resets on every response
  saveUninitialized: true,
  store: new RedisStore({
    client: sessionRedisClient,
    ttl: config.redis_ttl, // Redis session Time To Live
    prefix: config.session_redis_prefix,
  }),
  cookie: {
    httpOnly: true,
    sameSite: 'strict',
    path: config.session_cookie_path,
    secure: config.session_cookie_https,
    maxAge: config.session_cookie_max_age,
  },
});

export default sessionConfig;
