import axios from 'axios';
import config from '../config.js';

const baseURL = config.report_manager_url;

const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
});

export const findManyReports = (token, { urlParams }) => axios.get(`${baseURL}/reports?${urlParams}`, getHeader(token));

export const createReport = (token, data) => axios.post(`${baseURL}/devices`, data, getHeader(token));

export const deleteReport = (token, id) => axios.delete(`${baseURL}/reports/${id}`, getHeader(token));
