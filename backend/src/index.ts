import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { schema } from './graphql';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const server = new ApolloServer({ schema });
const startApollo = async () => {
  try {
    await server.start();
    server.applyMiddleware({ app, path: "/api"})
  } catch (error) {
    console.log(error);
  }
}

startApollo();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));