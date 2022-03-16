import pkg from 'pg';
import config from '../config.js';

export const pool = new pkg.Pool({
  user: config.postgres_user,
  host: config.postgres_host,
  database: config.postgres_database,
  password: config.postgres_password,
  port: config.postgres_port,
});

export const userPool = new pkg.Pool({
  user: config.postgres_backstage_user,
  host: config.postgres_backstage_host,
  database: config.postgres_backstage_databases,
  password: config.postgres_backstage_pwd,
  port: config.postgres_backstage_port,
});
