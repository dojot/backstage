import LOG from './Log.js';

const HandleResolverError = (session, error) => {
  LOG.error(error.stack || error);
  if (error.message.includes('401')) {
    session.destroy((sessionError) => {
      if (sessionError) LOG.error('Session Destroy Error', sessionError);
    })
  }
}

export default HandleResolverError;
