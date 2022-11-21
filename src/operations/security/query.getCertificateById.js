import * as service from '../../services/service.security.js';
import HandleResolverError from '../../utils/SessionValidation.js';

export const getCertificateById = async (_, { page, filter, id }, { session, token }) => {
  try {
    const ret = await service.getAllCertificates({
      token, page, filter, id,
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

export default getCertificateById;
