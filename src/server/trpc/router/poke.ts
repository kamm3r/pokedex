import { EvolutionClient, PokemonClient } from 'pokenode-ts';
import { z } from 'zod';
// import Pokedex from 'pokedex-promise-v2';
import { t } from '../trpc';

// const P = new Pokedex();
const pokeApi = new PokemonClient();

export const pokemonRouter = t.router({
  allPokemon: t.procedure.query(async () => {
    const allPokemon = await pokeApi.listPokemons(0, 151);
    const pokemon = allPokemon.results.map((p, index) => {
      const paddedId = ('00' + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return {
        ...p,
        image,
      };
    });
    return pokemon;
  }),
  getPokemon: t.procedure
    .input(z.object({ id: z.string(), evoId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id, evoId } = input;

      const pokeId = parseFloat(id);
      const evolveId = parseFloat(evoId);

      const pokeApi = new PokemonClient();
      const evoApi = new EvolutionClient();
      const pokemon = await pokeApi.getPokemonById(pokeId);
      const evolution = await evoApi.getEvolutionChainById(evolveId);

      const paddedId = ('00' + id).slice(-3);
      //@ts-ignore
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...pokemon, image, evolution };
    }),
});
