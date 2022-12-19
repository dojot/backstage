const TypeDefs = [`
type AllFlows {
    flows: [FlowMeta]
 }

type EditedFlow {
    flow: FlowMeta
}

type FlowRequest{
    flow: [String]
    enabled: Boolean
    name: String
}

type FlowMeta {
    name: String
    enabled: Boolean
    id: String
    flow: String
    created: Float
    updated: Float
}

type FlowNode {
    id: String
    name: String
    module: String
    version: String
    enabled: Boolean
    local: Boolean
    types: [String]
}

type Query {
    getFlowByID(id: String!): FlowMeta
    getAllFlows(id: String): AllFlows
    getAllNodes(id: String): [FlowNode]
}

type Mutation {
    createFlow(flow: String!): String
    editFlow(id: String!, flow: String): String
    deleteFlowByID(id: String!): String
 }
`];

export default TypeDefs;


