import LOG from "../../utils/Log.js";
import * as service from "../../services/service.fileManagement.js";

const downloadReport = async (_, { path }, { token }) => {
  try {
    const { data } = await service.downloadFile(token, { path, alt: "media" });

    const toBase64File = Buffer.from(data, 'binary').toString('base64');

    return toBase64File;
  } catch (error) {
    LOG.error(error.stack || error);
    throw error;
  }
};

export default downloadReport;
