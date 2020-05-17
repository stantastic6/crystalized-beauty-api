import { gql } from 'apollo-server-express';
import userSchema from './user.schema';
import productSchema from './product.schema';
import orderSchema from './order.schema';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, orderSchema, productSchema];
