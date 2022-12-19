import * as service from '../../services/service.flows.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const createFlow = async (_, { flow }, { token, session }) => {
  try {
    const ret = await service.createFlow(token, JSON.parse(flow));
    return ret.data.message;
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default createFlow;
