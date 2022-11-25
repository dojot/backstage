import axios from 'axios';
import config from '../config.js';

const baseURL = config.graphql_base_url;

const getHeader = token => ({
  headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
});

export const getAllFlows = token => axios.get(`${baseURL}/flows/v1/flow`, getHeader(token));

export const getFlowByID = (token, id) => axios.get(`${baseURL}/flows/v1/flow/${id}`, getHeader(token));

export const deleteFlowByID = (token, id) => axios.delete(`${baseURL}/flows/v1/flow/${id}`, getHeader(token));

export const editFlow = (token, id, flow) => axios.put(`${baseURL}/flows/v1/flow/${id}`, flow, getHeader(token));

export const createFlow = (token, flow) => axios.post(`${baseURL}/flows/v1/flow`, flow, getHeader(token));

export const getAllNodes = (token) => axios.get(`${baseURL}/flows/nodes`, getHeader(token));

export const getAllNodesHTML = (token) => axios.get(`${baseURL}/flows/nodes`, {headers: {'content-type': 'text/html', Authorization: `Bearer ${token}`}});
