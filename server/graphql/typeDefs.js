//Type definitions for queries and mutations
const { gql } = require('apollo-server');

module.exports = gql`
    type Product {
        id: ID!
        brand: String!
        title: String!
        model: String!
        dateAdded: String!
    }
    input NewProduct {
        brand: String!
        title: String!
        model: String!
    }
    type Query {
        getProducts: [Product]
    }
    type Mutation {
        addProduct(addProductInput: NewProduct): Product!
    }
`;