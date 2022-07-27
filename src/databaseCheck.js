import { userPool } from './db/index.js';
import LOG from './utils/Log.js';
import config from './config.js';

// check if table exists
async function checkTable(tableName, queryText) {
  let query = {
    text: 'SELECT * FROM information_schema.tables WHERE table_name=$1;',
    values: [tableName],
  };
  try {
    const client = await userPool.connect();
    const result = await client.query(query);
    if (!result.rowCount) {
      LOG.info(`Table ${tableName} not found.`);
      query = {
        text: queryText,
      };
      await client.query(query);
      LOG.info('Successfully created database, proceeding to check table existence.');
    } else {
      LOG.info(`Table ${tableName}  already exists.`);
    }
    LOG.info(`Table ${tableName} is available to use.`);
  } catch (err) {
    LOG.error(err);
    process.exit(1);
  } finally {
    userPool.end();
  }
}

// check if database exists
async function checkDatabase(databaseName) {
  let query = {
    text: 'SELECT * FROM pg_catalog.pg_database WHERE datname=$1;',
    values: [databaseName],
  };

  try {
    const result = await userPool.query(query);
    if (!result.rowCount) {
      LOG.info('Database does not exist.');
      query = {
        text: `CREATE DATABASE ${databaseName}`,
      };
      await userPool.query(query);
      LOG.info(
        'Successfully created database, proceeding to check table existence.',
      );
    } else {
      LOG.info(
        `Database ${databaseName} already exists, proceeding to check table existence.`,
      );
    }

    await checkTable(
      'favorite_devices',
      'CREATE TABLE favorite_devices ( \
        id serial NOT NULL PRIMARY KEY, \
        device_id varchar(255) NOT NULL, \
        user_name varchar(255) NOT NULL, \
        tenant varchar(255) NOT NULL \
      );',
    );

    await checkTable(
      'user_config',
      'CREATE TABLE user_config ( \
        tenant varchar(255) NOT NULL, \
        username varchar(255) NOT NULL, \
        configuration json NOT NULL, \
        last_update timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP, \
        CONSTRAINT unique_user PRIMARY KEY (tenant, username) \
      );',
    );
  } catch (err) {
    LOG.error(err);
    process.exit(1);
  } finally {
    userPool.end();
    process.exit();
  }
}

userPool.query('SELECT NOW()', (err, res) => {
  if (err) {
    LOG.error(`Erro: ${err} ${res}`);
    userPool.end();
    process.exit(1);
  }
});

checkDatabase(config.postgres_backstage_database);
