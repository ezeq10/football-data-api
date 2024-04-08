import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import typeDefs from './src/graphql/type.defs';
import { resolvers } from './src/graphql/resolvers';
import { 
  MONGODB_URI, 
  RATE_LIMIT_WINDOW_MS, 
  RATE_LIMIT_MAX_REQUESTS 
} from './src/config';

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');    
    startServer();
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// Start Express server  
async function startServer() {
  const app = express();

  // Apply rate limiting middleware
  const limiter = rateLimit({
    windowMs: Number(RATE_LIMIT_WINDOW_MS),
    max: Number(RATE_LIMIT_MAX_REQUESTS),
    message: 'Too many requests from this IP, please try again later.',
  });
  app.use(limiter);

  // Create ApolloServer and apply middleware to Express app
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}