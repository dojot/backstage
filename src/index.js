import express from 'express';
import bodyParser from 'body-parser';

import LOG from './utils/Log.js';
import config from './config.js';
import graphQLRoutes from './routers/GraphQL.js';
import keycloakRoutes from './routers/Keycloak.js';
import FlowRoutes from './routers/Flow.js';
import { sessionRedisClient } from './redis/index.js';
import sessionConfig from './keycloak/middlewares/sessionConfig.js';
import sessionValidator from './keycloak/middlewares/sessionValidator.js';
import sessionTokenGetter from './keycloak/middlewares/sessionTokenGetter.js';
import sessionTokenRefresher from './keycloak/middlewares/sessionTokenRefresher.js';

const app = express();

app.use(bodyParser.json());
app.use(sessionConfig(sessionRedisClient));
app.use(keycloakRoutes);
app.use(sessionValidator);
app.use(sessionTokenRefresher);
app.use(sessionTokenGetter);
app.use(FlowRoutes);
app.use(graphQLRoutes);

const server = app.listen(config.port, () => {
  LOG.debug(`Service started with configs \n${JSON.stringify(config, null, '\t')}`);
  LOG.info(`Server running on port ${config.port}`);
});

sessionRedisClient.connect().catch((error) => {
  LOG.error(error);
  server.close(); // Closes the express server if fails to connect to redis
});
