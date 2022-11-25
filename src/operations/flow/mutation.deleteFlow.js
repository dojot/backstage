import * as service from '../../services/service.flows.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const deleteFlowByID = async (_, { id, tenant }, { token, session }) => {
  try {
    await service.deleteFlowByID(token, id);
    return 'ok';
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default deleteFlowByID;
