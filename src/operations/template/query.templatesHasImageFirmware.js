const LOG = require("../../utils/Log");
const {RESERVED_LABEL_IMG} = require("../../constants")
const service =  require("../../services/service.template")
/**
 * Checks if templates has Image Firmware and return a array
 * with objects key-value, where key is a id template and value is a boolean.
 * The value is true if the template has image firmware.
 * @param root
 * @param templatesId
 * @param context
 * @returns {Promise<Array>}
 */
const templatesHasImageFirmware = async (root, { templatesId }, {token}) => {
  const map = [];
  const promises = [];
  templatesId.forEach((id) => {
    const promise = service.getTemplateId(token, id).then((res) => {
      const { data } = res;
      const { attrs } = data;

      // count number of reserved label, grouping by label
      const mapExistAllReserved = new Map();
      if( attrs ) {
        attrs.forEach((attr) => {
          if( attr.metadata && attr.metadata.length > 0 ) {
            attr.metadata.forEach((meta) => {
              if( RESERVED_LABEL_IMG.includes(meta.label) ) {
                mapExistAllReserved.set(meta.label, true);
              }
            });
          }
        });

        // if the template has all reservedLabelImg, then the template is for ImageFirmware
        const hasImageFirmware = mapExistAllReserved.size === RESERVED_LABEL_IMG.length;
        map.push({ key: `${ id }`, value: `${ hasImageFirmware }` });
      }
    }).catch((e) => {
      LOG.error(e);
    });
    promises.push(promise);
  });

  await Promise.all(promises);
  return map;
}

module.exports = templatesHasImageFirmware;
