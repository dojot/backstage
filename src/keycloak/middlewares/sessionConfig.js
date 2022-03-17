import session from 'express-session';

import config from '../../config.js';

const sessionConfig = session({
  secret: config.session_secret,
  name: config.session_cookie_name,
  domain: config.session_domain,
  proxy: config.session_proxy,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: config.session_cookie_https,
  },
});

export default sessionConfig;
