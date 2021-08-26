const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const dotenv = require('dotenv');
dotenv.config();

const MONGODB = process.env.MONGODB;


const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen(process.env.PORT || 5000 );
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });