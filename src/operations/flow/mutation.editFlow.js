import * as service from '../../services/service.flows.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const editFlow = async (_, { id, flow }, { token, session }) => {
  try {
    await service.editFlow(token, id, flow);
    return id;
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default editFlow;
