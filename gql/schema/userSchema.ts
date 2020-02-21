import { gql } from 'apollo-server-express';

export default gql`
  ####### TYPES ######

  # USERS
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: String
    lastLogin: String
  }

  ####### QUERIES ######
  type Query {
    user(id: ID!): User!
    users: [User!]!
  }

  ####### MUTATIONS ######
  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!)
  }
`;
