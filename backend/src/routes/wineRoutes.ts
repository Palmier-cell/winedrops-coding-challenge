import { FastifyInstance } from 'fastify';
import { getWinesHandler, searchWinesHandler } from '../controllers/wineController';

export async function routes(fastify: FastifyInstance) {
  fastify.get('/wines', getWinesHandler);
  fastify.get('/wines/search', searchWinesHandler);
}
