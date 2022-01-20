import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';
import templates from './routers/Templates.js';
import graphQL from './routers/GraphQL.js';
import { authParse } from './utils/auth.js';

const app = express();

app.use(bodyParser.json());
app.use(authParse);
app.use(templates);
app.use(graphQL);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
