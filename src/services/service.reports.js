import axios from 'axios';
import config from '../config.js';

const reportManagerUrl = config.report_manager_url;

const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
});

export const findManyReports = (token, { urlParams }) => axios.get(`${reportManagerUrl}/reports?${urlParams}`, getHeader(token));

export const createReport = (token, data) => axios.post(`${reportManagerUrl}/devices`, data, getHeader(token));

export const deleteReport = (token, id) => axios.delete(`${reportManagerUrl}/reports/${id}`, getHeader(token));
