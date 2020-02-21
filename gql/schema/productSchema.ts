import { gql } from 'apollo-server-express';

export default gql`
  ####### TYPES ######

  # USERS
  type Product {
    id: ID!
    name: String
    description: String
    imageUrl: String
    prices: [PriceListItem]
    sku: String
    unitsAvailable: Int
    slug: String
  }

  type PriceListItem {
    length: Int
    price: Int
  }

  input PriceListItemInput {
    length: Int
    price: Int
  }

  ####### QUERIES ######
  extend type Query {
    product(id: ID!): Product!
    products: [Product!]!
  }

  ####### MUTATIONS ######
  extend type Mutation {
    createProduct(
      name: String!
      description: String!
      imageUrl: String!
      prices: [PriceListItemInput]
      sku: String!
      unitsAvailable: Int
    ): Product!
    updateProduct(
      name: String
      description: String
      imageUrl: String
      prices: [PriceListItemInput]
      sku: String
      unitsAvailable: Int
    ): Product!
    deleteProduct(id: String!): Product!
  }
`;
