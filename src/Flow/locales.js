import LOG from '../utils/Log.js';
import axios from 'axios';
import config from '../config.js';

const flowsUrl = config.flows_url;

const locales = async (req, res) => {
  try {
    const token = req.session.accessToken;

    const i18nObj = await axios.get(`${flowsUrl}/locales/${req.params.localeLabel}`, {
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
