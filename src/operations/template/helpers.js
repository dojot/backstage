const {RESERVED_LABEL_IMG} = require("../../constants")

const hasReservedLabelImg = ((attr) => {
  if( attr.metadata && attr.metadata.length > 0 ) {
    if( attr.metadata.find(meta => RESERVED_LABEL_IMG.includes(meta.label)) ) {
      return true;
    }
  }
  return false;
});

module.exports = {
  hasReservedLabelImg
}
