import session from 'express-session';

// TODO: use from config
// import config from '../../config.js';

const sessionMiddleware = session({
  secret: 'secret',
  name: 'backstage_cookie',
  domain: 'localhost',
  proxy: true,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
});

export default sessionMiddleware;
