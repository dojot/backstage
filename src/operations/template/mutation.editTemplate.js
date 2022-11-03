import lodash from 'lodash';
import * as service from '../../services/service.template.js';
import { getObjectWithNewKeys } from '../../utils/Object.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const editTemplate = async (_, { id, label, attrs }, { session, token }) => {
  try {
    const formattedAttrs = attrs
      ? attrs.map(attr => getObjectWithNewKeys(attr, lodash.snakeCase))
      : [];

    const { data } = await service.editTemplate(token, id, {
      label,
      attrs: formattedAttrs,
    });

    return data.updated;
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default editTemplate;
