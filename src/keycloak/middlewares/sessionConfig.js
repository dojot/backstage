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
  saveUninitialized: false,
  store: new RedisStore({ client: sessionRedisClient }),
  cookie: {
    httpOnly: true,
    sameSite: 'strict',
    path: config.session_cookie_path,
    secure: config.session_cookie_https,
  },
});

export default sessionConfig;
