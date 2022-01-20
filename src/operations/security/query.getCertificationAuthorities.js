import LOG from '../../utils/Log.js';
import * as service from '../../services/service.security.js';

const getCertificationAuthorities = async (_, { page, filter }, { token }) => {
  try {
    const { data } = await service.getCertificationAuthorities(token, page, filter);
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
    LOG.error(error.stack || error);
    throw error;
  }
};

export default getCertificationAuthorities;
