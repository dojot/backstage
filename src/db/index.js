import pkg from 'pg';
import config from '../config.js';

export const userPool = new pkg.Pool({
  user: config.postgres_backstage_user,
  host: config.postgres_backstage_host,
  database: config.postgres_backstage_databases,
  password: config.postgres_backstage_pwd,
  port: config.postgres_backstage_port,
});
