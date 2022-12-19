import * as service from '../../services/service.flows.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const getFlowByID = async (_, { id }, { token, session }) => {
  try {
    const ret = await service.getFlowByID(token, id);
    const { flow: { flow, ...otherProps }} = ret.data;

    return {
      ...otherProps,
      flow: JSON.stringify(flow)
    };
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default getFlowByID;
