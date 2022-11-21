import * as service from '../../services/service.security.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const getCertificationAuthorities = async (_, { page, filter, sortBy }, { session, token }) => {
  try {
    const { data } = await service.getCertificationAuthorities({
      token, page, filter, sortBy: sortBy || 'desc:createdAt',
    });

    const certificationAuthorities = data['trusted-cas'];

    const pagination = {
      currentPage: data.paging.current.number,
      totalPages: data.paging.totalPages,
      hasNextPage: data.paging.next
        ? data.paging.current.number !== data.paging.next.number
        : false,
      nextPage: data.paging.next ? data.paging.next.number : null,
      totalItems: data.paging.totalItems,
      limitPerPage: data.paging.limitPerPage,
    };

    return { certificationAuthorities, pagination };
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default getCertificationAuthorities;
