const { snakeCase } = require('lodash');
const LOG = require('../../utils/Log');
const service = require('../../services/service.template');
const { getObjectWithNewKeys } = require('../../utils/Object');

const createTemplate = async (_, { label, attrs }, { token }) => {
  try {
    const formattedAttrs = attrs
      ? attrs.map(attr => getObjectWithNewKeys(attr, snakeCase))
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

module.exports = createTemplate;
