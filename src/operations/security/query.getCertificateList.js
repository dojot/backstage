import * as service from '../../services/service.security.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const getCertificateList = async (_, { page, filter, sortBy }, { session, token }) => {
  try {
    const ret = await service.getAllCertificates({
      token, page, filter, sortBy: sortBy || 'desc:createdAt',
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
    HandleResolverError(session, error);
    throw error;
  }
};

export default getCertificateList;
