import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';

import LOG from '../utils/Log.js';

import rootSchema from '../Schema.js';
import config from '../config.js';

const router = Router();

router.use('/backstage/graphql', graphqlHTTP({
  schema: rootSchema,
  graphiql: config.enable_graphiql,
  customFormatErrorFn: (error) => {
    LOG.error(error);
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
