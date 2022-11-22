import LOG from "../../utils/Log.js";
import * as service from "../../services/service.reports.js";

const deleteReport = async (_, { id }, { token }) => {
  try {
    await service.deleteReport(token, id);

    return 'ok';
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default deleteReport;
