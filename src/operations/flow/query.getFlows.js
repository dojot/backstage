import * as service from '../../services/service.flows.js';
import HandleResolverError from '../../utils/SessionValidation.js';

const getAllFlows = async (_, context, { token, session }) => {
  try {
    const ret =  await service.getAllFlows(token);
    const data = ret.data.flows.map(({flow, ...others}) => {
      return {
        flow: JSON.stringify(flow),
        ...others
      }
    })

    return { flows: data  }
  } catch (error) {
    HandleResolverError(session, error);
    throw error;
  }
};

export default getAllFlows;
