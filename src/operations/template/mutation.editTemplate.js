const { snakeCase } = require('lodash');
const LOG = require('../../utils/Log');
const service = require('../../services/service.template');
const { getObjectWithNewKeys } = require('../../utils/Object');

const editTemplate = async (_, { id, label, attrs }, { token }) => {
  try {
    const formattedAttrs = attrs
      ? attrs.map(attr => getObjectWithNewKeys(attr, snakeCase))
      : [];

    const { data } = await service.editTemplate(token, id, {
      label,
      attrs: formattedAttrs,
    });

    return data.updated;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = editTemplate;
