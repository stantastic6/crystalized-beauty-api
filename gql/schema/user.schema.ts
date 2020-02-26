import { gql } from 'apollo-server-express';

export default gql`
  ####### TYPES ######

  # USERS
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    role: String
    lastLogin: String
  }

  type SessionToken {
    token: String!
  }

  ####### QUERIES ######
  extend type Query {
    user(id: ID!): User!
    users: [User!]!
  }

  ####### MUTATIONS ######
  extend type Mutation {
    login(email: String!, password: String!): SessionToken!
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
    updateUser(
      id: String!
      firstName: String
      lastName: String
      email: String
      password: String
      role: String
    ): User!
    deleteUser(id: ID!): User!
  }
`;
