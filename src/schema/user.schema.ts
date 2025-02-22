import { gql } from 'apollo-server-express';

export default gql`
  ####### TYPES ######

  # USERS
  type User {
    _id: ID!
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

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String
    role: String
  }

  ####### QUERIES ######
  extend type Query {
    user(id: ID!): User!
    users: [User!]!
  }

  ####### MUTATIONS ######
  extend type Mutation {
    login(email: String!, password: String!): SessionToken!
    createUser(input: CreateUserInput!): SessionToken!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }
`;
