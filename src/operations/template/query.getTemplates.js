import * as service from '../../services/service.template.js';

const getTemplates = async (_, { page, filter }, { token }) => {
  const requestParameters = {};

  if (page) {
    requestParameters.page_size = page.size || 20;
    requestParameters.page_num = page.number || 1;
  }

  if (filter) {
    requestParameters.label = filter.label;
  }

  const { data: fetchedData } = await service.getTemplateWithParams(
    token,
    new URLSearchParams(requestParameters).toString(),
  );


  const templates = fetchedData.templates.map((template) => {
    let attrs = [];

    if (template.attrs) {
      attrs = template.attrs.map(attr => ({
        id: attr.id,
        type: attr.type,
        label: attr.label,
        valueType: attr.value_type,
        templateId: attr.template_id,
        staticValue: attr.static_value,
        isDynamic: attr.type === 'dynamic',
      }));
    }

    return {
      id: template.id,
      label: template.label,
      created: template.created,
      attrs,
    };
  });

  return {
    totalPages: fetchedData.pagination.total,
    currentPage: fetchedData.pagination.page,
    templates,
  };
};

export default getTemplates;
