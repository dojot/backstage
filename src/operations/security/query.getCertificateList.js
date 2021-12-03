const LOG = require("../../utils/Log");
const service = require('../../services/service.security')

const getCertificateList = async (root, {page}, {token}) => {

  try {
    const ret = await service.getAllCertificates(token, page);
    const {data: {paging, certificates}} = ret;
    const pagination = {
      page: paging.current.number,
      total: paging.totalPages,
      hasNext: paging.next ? paging.current.number !== paging.next.number : false,
      nextPage: paging.next ? paging.next.number : null,
      totalItems: paging.totalItems,
      limitPerPage: paging.limitPerPage
    }

    return {certificates, pagination};
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
}

module.exports = getCertificateList;
