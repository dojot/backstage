import LOG from '../utils/Log.js';

import axios from 'axios';
import config from '../config.js';

const baseURL = config.graphql_base_url;
const nodes = async (req, res) => {
  try {
    const token = req.session.accessToken;
    const i18nObj = await axios.get(`${baseURL}/flows/nodes`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return res.send(i18nObj.data);

  } catch (error) {
    LOG.error(error.stack || error);
    return res.status(500).send(error.message);
  }
};

export default nodes;
