import LOG from '../utils/Log.js';

import axios from 'axios';
import config from '../config.js';

const baseURL = config.graphql_base_url;
const locales = async (req, res) => {
  try {
    const token = req.session.accessToken;
    const i18nObj = await axios.get(`${baseURL}/flows/locales/${req.params.localeLabel}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return res.json(i18nObj.data);

  } catch (error) {
    LOG.error(error.stack || error);
    return res.status(500).send(error.message);
  }
};

export default locales;
