import userSchema from './userSchema';
import productSchema from './productSchema';
import orderSchema from './orderSchema';
import { gql } from 'apollo-server-express';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, orderSchema, productSchema];
