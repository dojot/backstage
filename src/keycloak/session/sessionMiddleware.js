import session from 'express-session';

const sessionMiddleware = session({
  secret: 'the_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
});

export default sessionMiddleware;
