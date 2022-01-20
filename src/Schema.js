import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs } from '@graphql-tools/merge';
import lodash from 'lodash';
import templateTypeDefs from './operations/template/TypeDefs.js';
import templateResolvers from './operations/template/Resolvers.js';
import deviceTypeDefs from './operations/device/TypeDefs.js';
import deviceResolvers from './operations/device/Resolvers.js';
import userTypeDefs from './operations/configuration/TypeDefs.js';
import userResolvers from './operations/configuration/Resolvers.js';
import securityTypeDefs from './operations/security/TypeDefs.js';
import securityResolvers from './operations/security/Resolvers.js';
import templateAttrTypeDefs from './operations/templateAttr/TypeDefs.js';


import templateAttrResolvers from './operations/templateAttr/Resolvers.js';
// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects

export const typeDefs = mergeTypeDefs([
  templateTypeDefs,
  deviceTypeDefs,
  userTypeDefs,
  securityTypeDefs,
  templateAttrTypeDefs
]);

const resolvers = lodash.merge(
  templateResolvers,
  deviceResolvers,
  userResolvers,
  securityResolvers,
  templateAttrResolvers,
);


const executableSchema = makeExecutableSchema({ typeDefs, resolvers });

export default executableSchema;

