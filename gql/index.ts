import { config } from 'dotenv';
import * as express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { connect } from 'mongoose';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import * as dotenv from 'dotenv';
import resolvers from './resolvers';
import schema from './schema';
import { verify } from 'jsonwebtoken';

config();

const app = express();
app.use(cors());
dotenv.config();

app.disable('x-powered-by');
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

const PORT: any = process.env.PORT || 5000;
const DB_URL: any = process.env.DB_URL || '';

const getUserSession = async (req: any) => {
  const token = req.headers['token'];

  if (token) {
    try {
      return verify(token, 'changethis');
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => ({ authedUser: await getUserSession(req) }),
  playground: process.env.NODE_ENV === 'development' ? true : false,
  introspection: true,
  tracing: true,
});

server.applyMiddleware({
  app,
  path: '/graphql',
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log(`${DB_URL}`);
  console.log(`🚀 Connecting to mongodb ${PORT}`);
  connect(
    DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
});
