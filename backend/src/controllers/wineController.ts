import { FastifyReply, FastifyRequest } from 'fastify';
import { getWines as fetchWines, searchWines as fetchSearchedWines } from '../services/wineService';

// Controller for getting best-selling wines based on filter
export async function getWinesHandler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { filter } = request.query as { filter?: string };
  const validFilter = ['revenue', 'bottles', 'orders'].includes(filter);
  try {
    const wines = await fetchWines(validFilter ? filter : 'revenue');
    reply.send(wines);
  } catch (err) {
    reply.code(500).send(err);
  }
}

// Controller for searching wines
export async function searchWinesHandler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { query } = request.query as { query: string };
  try {
    const wines = await fetchSearchedWines(query);
    reply.send(wines);
  } catch (err) {
    reply.code(500).send(err);
  }
}
