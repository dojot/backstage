import session from 'express-session';

// TODO: use from config
// import config from '../../config.js';

const sessionConfig = session({
  secret: 'secret',
  name: 'dojot-backstage-cookie',
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

export default sessionConfig;
