import lodash from 'lodash';
import * as service from '../../services/service.template.js';
import { getObjectWithNewKeys } from '../../utils/Object.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const createTemplate = async (_, { label, attrs }, { session, token }) => {
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
    HandleResolverError(session, error);
    throw error;
  }
};

export default createTemplate;
