import { GameClient, PokemonClient } from 'pokenode-ts';

export const GenerationByName = async (generation: string) => {
  const api = new GameClient();

  await api
    .getGenerationByName(generation)
    .then((data) => console.log(data.name))
    .catch((err) => console.error(err));
};

export const PokedexByName = async (pokedex: string) => {
  const api = new GameClient();

  await api
    .getPokedexByName(pokedex)
    .then((data) => console.log(data.name))
    .catch((err) => console.error(err));
};

export const PokemonByName = async (pokemon: string) => {
  const api = new PokemonClient();

  await api
    .getPokemonByName(pokemon)
    .then((data) => console.log(data.name))
    .catch((err) => console.error(err));
};
