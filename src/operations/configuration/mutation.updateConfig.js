import { userPool } from '../../db/index.js';
import LOG from '../../utils/Log.js';

const updateConfig = async (root, params) => {
  const genUser = '**generic_user**';
  try {
    if (params.config === null) {
      throw 'Dashboard configuration cannot be null';
    }
    let query = {};
    if (params.user) {
      if (params.user === genUser) {
        throw 'Cannot use this username';
      }
      query = {
        text: 'SELECT * FROM user_config WHERE username=$1 AND tenant=$2;',
        values: [params.user, params.tenant],
      };
    } else {
      query = {
        text: 'SELECT * FROM user_config WHERE username=$1 AND tenant=$2;',
        values: [genUser, params.tenant],
      };
      params.user = genUser;
    }

    const date = new Date().toLocaleString();
    let result = await userPool.query(query);


    if (result.rowCount) {
      query = {
        text: 'UPDATE user_config SET configuration=$3, last_update=$4 WHERE username=$1 AND tenant=$2;',
        values: [params.user, params.tenant, JSON.parse(params.config), date],
      };
      result = await userPool.query(query);
      if (result.rowCount) {
        return "Updated user's dashboard configuration";
      }

      throw 'Could not update database';
    } else {
      query = {
        text: 'INSERT INTO user_config VALUES ($1, $2, $3, $4);',
        values: [params.tenant, params.user, JSON.parse(params.config), date],
      };
      result = await userPool.query(query);
      if (result.rowCount) {
        return 'Added configuration to database';
      }

      throw 'Failed to insert into database';
    }
  } catch (error) {
    LOG.error(error);
    return 'Could not complete operation';
  }
}

export default updateConfig;
