// src/server/router/index.ts
import { t } from '../trpc';

import { pokemonRouter } from './poke';

export const appRouter = t.router({
  poke: pokemonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
