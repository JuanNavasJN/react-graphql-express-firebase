const express = require('express');
const graphqlHTTP = require('express-graphql');
// const schema = require('./schema/schema');
const cors = require('cors');
const port = 8080;
const app = express();

// =---------------------------------------------------------
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./schema/resolvers');
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
// =---------------------------------------------------------

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);
app.listen(port, () => console.log(`listening to localhost:${port}`));
