import { config } from 'dotenv';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connection } from 'mongoose';
import schema from './schema';

config();

const app = express();
const PORT: any = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs: schema,
  playground: process.env.NODE_ENV === 'development' ? true : false,
  introspection: true,
  tracing: true,
});

server.applyMiddleware({
  app,
  path: '/',
  cors: true,
  onHealthCheck: () =>
    new Promise((resolve, reject) => {
      if (connection.readyState > 0) {
        resolve();
      } else {
        reject();
      }
    }),
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  // console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
});
