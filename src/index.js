import express from 'express';
import bodyParser from 'body-parser';

import config from './config.js';
import graphQLRoutes from './routers/GraphQL.js';
import keycloakRoutes from './routers/Keycloak.js';
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
app.use(graphQLRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

sessionRedisClient.connect().catch(console.error);
