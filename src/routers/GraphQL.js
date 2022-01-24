import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schemaLogin, schemaPermission } from '../operations/authentication/SchemaAuth.js';
import rootSchema from '../Schema.js';

const router = Router();

/**
 * Create endpoint for login,
 * This end point not need a jwt token,  that is config in kong
 */
router.use('/graphql-auth/', graphqlHTTP({
  schema: schemaLogin,
  graphiql: false, // graphql interface
}));

/**
 * Create endpoint for permissions
 */
router.use('/graphql/permissions', graphqlHTTP({
  schema: schemaPermission,
  graphiql: false, // graphql interface
}));

/**
 * Create endpoint for  geral
 */
router.use('/graphql/', graphqlHTTP({
  schema: rootSchema,
  graphiql: false, // graphql interface
}));


export default router;
