const service = require("../../services/service.template")
const {hasReservedLabelImg} =  require("./helpers")
/**
 * Get one template by id
 * @param root
 * @param id
 * @param context
 * @returns {Promise<*>}
 */
const template = async (root, { id }, {token}) => {

  const { data: templateData } = await service.getTemplateId(token, id);
  const attrImg = [];

  function cleanNullMetadataToEmpty(attrs) {
    attrs.map((attr) => {
      if( !attr.metadata ) {
        const attrAux = attr;
        attrAux.metadata = [];
        return attrAux;
      }
      return attr;
    });
  }

  if( templateData ) {
    let { attrs, config_attrs: configAttrs, data_attrs: dataAttrs } = templateData;
    if( attrs ) {
      attrs = attrs.filter((attr) => {
        if( hasReservedLabelImg(attr) ) {
          attrImg.push(attr);
          return false;
        }
        return true;
      });
      cleanNullMetadataToEmpty(attrs);
      cleanNullMetadataToEmpty(attrImg);
    }
    if( configAttrs ) {
      configAttrs = configAttrs.filter(attr => !hasReservedLabelImg(attr));
      cleanNullMetadataToEmpty(configAttrs);
    }

    if( dataAttrs ) {
      dataAttrs = dataAttrs.filter(attr => !hasReservedLabelImg(attr));
      cleanNullMetadataToEmpty(dataAttrs);
    }

    return {
      ...templateData,
      img_attrs: attrImg,
      config_attrs: configAttrs,
      data_attrs: dataAttrs,
      attrs,
    };
  }
  return {};
}

module.exports = template;
