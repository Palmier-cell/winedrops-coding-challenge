import fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes/wineRoutes';

const app = fastify({ logger: true });

// Middleware
app.register(cors, {
  origin: '*',
});

// Register routes
app.register(routes);

// Start the Fastify server
app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
