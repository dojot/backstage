import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';

import rootSchema from '../Schema.js';

const router = Router();

router.use('/backstage/graphql', graphqlHTTP({
  schema: rootSchema,
  graphiql: false,
}));

export default router;
