import { pool, userPool } from "./db/index.js";
import LOG from "./utils/Log.js";
import config from "./config.js";

// check if database exists
async function checkDatabase(database_name) {
  let query = {
    text: "SELECT * FROM pg_catalog.pg_database WHERE datname=$1;",
    values: [database_name],
  };

  try {
    const result = await pool.query(query);
    if (!result.rowCount) {
      LOG.info("Database does not exist.");
      query = {
        text: `CREATE DATABASE ${database_name}`,
      };
      await pool.query(query);
      LOG.info(
        "Successfully created database, proceeding to check table existence."
      );
    } else {
      LOG.info(
        `Database ${database_name} already exists, proceeding to check table existence.`
      );
    }

    await checkTable(
      "favorite_devices",
      "CREATE TABLE favorite_devices ( \
        id serial NOT NULL PRIMARY KEY, \
        device_id varchar(255) NOT NULL, \
        user_name varchar(255) NOT NULL, \
        tenant varchar(255) NOT NULL \
      );"
    );
    await checkTable(
      "user_config",
      "CREATE TABLE user_config ( \
        tenant varchar(255) NOT NULL, \
        username varchar(255) NOT NULL, \
        configuration json NOT NULL, \
        last_update timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP, \
        CONSTRAINT unique_user PRIMARY KEY (tenant, username) \
      );"
    );
  } catch (err) {
    LOG.error(err);
    process.exit(1);
  } finally {
    pool.end();
    userPool.end();
  }
}

// check if table exists
async function checkTable(table_name, queryText) {
  let query = {
    text: "SELECT * FROM information_schema.tables WHERE table_name=$1;",
    values: [table_name],
  };
  try {
    const client = await userPool.connect();
    const result = await client.query(query);
    if (!result.rowCount) {
      LOG.info(`Table ${table_name} not found.`);
      query = {
        text: queryText,
      };
      await client.query(query);
    } else {
      LOG.info(`Table ${table_name}  already exists.`);
    }
    LOG.info(`Table ${table_name} is available to use.`);
    process.exit();
  } catch (err) {
    LOG.error(`Erro: ${err}`);
    throw err;
  }
}

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    LOG.error(`Erro: ${err} ${res}`);
    pool.end();
    process.exit(1);
  }
});

checkDatabase(config.postgres_backstage_database);
