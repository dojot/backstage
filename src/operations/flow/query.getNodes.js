import * as service from '../../services/service.flows.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const getAllNodes = async (_, context, { token, session }) => {
  try {
    const ret = await service.getAllNodes(token);
    return ret.data;
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default getAllNodes;
