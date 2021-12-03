const service = require('../../services/service.template');
const { formatValueType } = require('../device/helpers');

const getTemplates = async (_, { page }, { token }) => {
  let requestString = '';

  if (page) {
    requestString += `page_size=${page.size || 20}&page_num=${
      page.number || 1
    }&sortBy=label`;
  }

  const { data: fetchedData } = await service.getTemplateWithParams(
    token,
    requestString,
  );

  const templates = fetchedData.templates.map((template) => {
    let attrs = [];

    if (template.attrs) {
      attrs = template.attrs.map(attr => ({
        id: attr.id,
        type: attr.type,
        label: attr.label,
        templateId: attr.template_id,
        staticValue: attr.static_value,
        isDynamic: attr.type === 'dynamic',
        valueType: formatValueType(attr.value_type),
      }));
    }

    return {
      id: template.id,
      label: template.label,
      attrs,
    };
  });

  return {
    totalPages: fetchedData.pagination.total,
    currentPage: fetchedData.pagination.page,
    templates,
  };
};

module.exports = getTemplates;
