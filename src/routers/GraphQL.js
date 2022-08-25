import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';

import rootSchema from '../Schema.js';

const router = Router();

router.use('/backstage/graphql', graphqlHTTP({
  schema: rootSchema,
  graphiql: false,
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
