import * as service from '../../services/service.template.js';

const getTemplates = async (_, { page, filter, sortBy }, { token }) => {
  const urlParams = new URLSearchParams({
    sortBy: sortBy || 'desc:created',
  });

  if (page) {
    urlParams.append('page_size', page.size || 20);
    urlParams.append('page_num', page.number || 1);
  }

  if (filter) {
    urlParams.append('label', filter.label);
  }

  const { data: fetchedData } = await service.getTemplateWithParams(
    token,
    urlParams.toString(),
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
