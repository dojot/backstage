import LOG from '../../utils/Log.js';

const sessionValidator = (req, res, next) => {
  const token = req.session.accessToken;

  if (token) {
    LOG.info('Token exists. Session is valid');
    next();
  } else {
    LOG.info('Token does not exists. There is no valid session');

    req.session.destroy((sessionError) => {
      if (sessionError) LOG.error('Session Destroy Error', sessionError);
    });

    res.status(401).send({ message: 'There is no valid session' });
  }
};

export default sessionValidator;
