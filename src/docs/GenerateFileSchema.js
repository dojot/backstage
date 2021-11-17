const { writeFileSync } = require('fs');
const { typeDefs } = require('../Schema');

writeFileSync(`${__dirname}/schemaDoc.graphql`, (typeDefs));
