import LOG from '../../utils/Log.js';
import * as service from '../../services/service.security.js';

const getCertificateList = async (_, { page, filter, sortBy }, { token }) => {
  try {
    const ret = await service.getAllCertificates({
      token, page, filter, sortBy,
    });

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

export default getCertificateList;
