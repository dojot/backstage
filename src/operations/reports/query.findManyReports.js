import LOG from "../../utils/Log.js";
import * as service from "../../services/service.reports.js";

const findManyReports = async (_, { page, pageSize }, { token }) => {
  try {
    const { data } = await service.findManyReports(token, { page, pageSize });

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
