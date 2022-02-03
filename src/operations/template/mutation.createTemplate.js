import lodash from 'lodash';
import LOG from '../../utils/Log.js';
import * as service from '../../services/service.template.js';
import { getObjectWithNewKeys } from '../../utils/Object.js';

const createTemplate = async (_, { label, attrs }, { token }) => {
  try {
    const formattedAttrs = attrs
      ? attrs.map(attr => getObjectWithNewKeys(attr, lodash.snakeCase))
      : [];

    const { data } = await service.createTemplate(token, {
      label,
      attrs: formattedAttrs,
    });

    return data.template;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default createTemplate;
