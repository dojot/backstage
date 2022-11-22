import findManyReports from './query.findManyReports.js';

import createReport from './mutation.createReport.js';
import deleteReport from './mutation.deleteReport.js';
import downloadReport from './mutation.downloadReport.js';

const Resolvers = {
  Query: {
    findManyReports,
  },
  Mutation: {
    createReport,
    deleteReport,
    downloadReport,
  },
};

export default Resolvers;
