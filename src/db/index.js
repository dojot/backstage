import pkg from 'pg';
import config from '../config.js';
import LOG from '../utils/Log.js';

const databaseOptions = {
  user: config.postgres_backstage_user,
  host: config.postgres_backstage_host,
  password: config.postgres_backstage_pwd,
  port: config.postgres_backstage_port,
};

LOG.debug(`Initializing database with ${JSON.stringify(databaseOptions, null, '\t')}`);

export const userPool = new pkg.Pool(databaseOptions);
