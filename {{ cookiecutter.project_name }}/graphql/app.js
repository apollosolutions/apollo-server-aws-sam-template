const { gql, ApolloServer } = require("apollo-server-lambda");
const { Headers } = require("apollo-server-env");
const { buildFederatedSchema } = require("@apollo/federation");
const express = require("express");
const AWS = require("aws-sdk");
const http = require("http");
const agent = new http.Agent({
  keepAlive: true,
  maxSockets: Infinity,
});

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const schema = buildFederatedSchema({ typeDefs, resolvers });
const server = new ApolloServer({
  schema,
  persistedQueries: true,
});

// const apqRouter = express();
// apqRouter.use("*", );
exports.graphqlHandler = server.createHandler();
// exports.graphqlHandler = async (event, context) => {
//   console.log("test");
//   let headers = new Headers();
//   Object.keys(event.multiValueHeaders).forEach((header, value) =>
//     headers.append(header, value)
//   );
//   return await server.executeOperation({
//     variables: event.variables,
//     query: event.query,
//     http: {
//       url: event.path,
//       method: event.httpMethod,
//       headers,
//     },
//   });
// };
