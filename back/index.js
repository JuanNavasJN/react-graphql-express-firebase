const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');

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

app.use(express.static(path.resolve(__dirname, './public')));

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.listen(port, () => console.log(`listening to localhost:${port}`));
