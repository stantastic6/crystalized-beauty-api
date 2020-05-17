import { gql } from 'apollo-server-express';

export default gql`
  ####### TYPES ######

  # ORDERS
  type Order {
    id: ID!
    amount: Int
    user: User
    products: [Product]
  }

  input OrderInput {
    amount: Int
    userId: ID
    productIds: [ID]
  }

  ####### QUERIES ######
  extend type Query {
    order(id: ID!): Order!
    orders: [Order!]!
  }

  ####### MUTATIONS ######
  extend type Mutation {
    createOrder(input: OrderInput!): Order!
    updateOrder(id: ID!, input: OrderInput!): Order!
    deleteOrder(id: ID!): Order!
  }
`;
