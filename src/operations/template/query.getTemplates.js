const service = require("../../services/service.template");
const {formatValueType} = require("../device/helpers")

const getTemplates = async (root, { page }, {token}) => {
  let requestString = ''

  if( page ) {
    requestString += `page_size=${ page.size || 20 }&page_num=${ page.number || 1 }&sortBy=label`
  }

  const { data: fetchedData } = await service.getTemplateWithParams(token, requestString);
  const templates = [];
  fetchedData.templates.forEach((template) => {
    const attributes = [];
    if( template.attrs ) {
      template.attrs.forEach((attr) => {
        if( attr.type !== 'dynamic' && attr.value_type !== 'geo:point' ) {
          return;
        }
        attributes.push({
          label: attr.label,
          valueType: formatValueType(attr.value_type),
          isDynamic: attr.type === 'dynamic',
          staticValue: attr.static_value,
        });
      });
    }
    templates.push({
      id: template.id,
      label: template.label,
      attrs: attributes,
    });
  });

  return ({
    totalPages: fetchedData.pagination.total,
    currentPage: fetchedData.pagination.page,
    templates,
  });
}

module.exports = getTemplates;
