import createFlow from './mutation.createFlow.js';
import editFlow from './mutation.editFlow.js';
import deleteFlowByID from './mutation.deleteFlow.js';
import getFlowByID from './query.getFlowByID.js';
import getAllFlows from './query.getFlows.js';
import getAllNodes from './query.getNodes.js';


const Resolvers = {
  Query: {
    getFlowByID,
    getAllFlows,
    getAllNodes,
  },
  Mutation: {
    createFlow,
    editFlow,
    deleteFlowByID,
  },
};

export default Resolvers;
