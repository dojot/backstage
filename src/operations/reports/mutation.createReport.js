import LOG from "../../utils/Log.js";
import * as service from "../../services/service.reports.js";

const createReport = async (_, params, { token }) => {
  try {
    const response = await service.createReport(token, params);

    return response.data;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default createReport;
