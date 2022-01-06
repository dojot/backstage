const LOG = require('../../utils/Log');
const service = require('../../services/service.security');

const getCertificateById = async (_, { page, filter, id }, { token }) => {
  try {
    const ret = await service.getAllCertificates(token, page, filter, id);
    const { data: { paging, certificates } } = ret;

    const pagination = {
      currentPage: paging.current.number,
      totalPages: paging.totalPages,
      hasNextPage: paging.next ? paging.current.number !== paging.next.number : false,
      nextPage: paging.next ? paging.next.number : null,
      totalItems: paging.totalItems,
      limitPerPage: paging.limitPerPage,
    };

    return { certificates, pagination };
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

module.exports = getCertificateById;
