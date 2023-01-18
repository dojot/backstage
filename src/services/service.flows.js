import axios from 'axios';
import config from '../config.js';

const flows = config.flows_url;

const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
});

export const getAllFlows = token => axios.get(`${flows}/v1/flow`, getHeader(token));

export const getFlowByID = (token, id) => axios.get(`${flows}/v1/flow/${id}`, getHeader(token));

export const deleteFlowByID = (token, id) => axios.delete(`${flows}/v1/flow/${id}`, getHeader(token));

export const editFlow = (token, id, flow) => axios.put(`${flows}/v1/flow/${id}`, flow, getHeader(token));

export const createFlow = (token, flow) => axios.post(`${flows}/v1/flow`, flow, getHeader(token));

export const getAllNodes = (token) => axios.get(`${flows}/nodes`, getHeader(token));

export const getAllNodesHTML = (token) => axios.get(`${flows}/nodes`, {headers: {'content-type': 'text/html', Authorization: `Bearer ${token}`}});
