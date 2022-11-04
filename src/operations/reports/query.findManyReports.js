import LOG from "../../utils/Log.js";
import * as service from "../../services/service.reports.js";

const findManyReports = async (_, { page, pageSize, name }, { token }) => {
  try {
    const urlParams = new URLSearchParams({
      page: page || 1,
      pageSize: pageSize || 10,
    });

    if (name) {
      urlParams.append('name', name);
    }


    const { data } = await service.findManyReports(token, { urlParams });

    return {
      total: data.pagination.total,
      page: data.pagination.page,
      pageSize: data.pagination.pageSize,
      reports: data.reports,
    };
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default findManyReports;
