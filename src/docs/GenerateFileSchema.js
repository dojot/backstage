import { writeFileSync } from 'fs';
import { typeDefs } from '../Schema';

writeFileSync(`${__dirname}/schemaDoc.graphql`, (typeDefs));
