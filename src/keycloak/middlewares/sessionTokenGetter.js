import LOG from '../../utils/Log.js';

const sessionTokenGetter = (req, _, next) => {
  LOG.info('Set token in the request object');
  req.token = req.session.accessToken;
  next();
};

export default sessionTokenGetter;
