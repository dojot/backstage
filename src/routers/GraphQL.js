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
  customFormatErrorFn(error) {
    let data;

    if (
      error.originalError
      && error.originalError.response
      && error.originalError.response.data
    ) {
      const { data: errorData } = error.originalError.response;
      data = errorData;
    }

    return {
      path: error.path,
      message: error.message,
      locations: error.locations,
      extensions: error.extensions,
      data,
    };
  },
}));


export default router;
