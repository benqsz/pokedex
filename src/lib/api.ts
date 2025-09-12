import { NamedAPIResourceList, Pokemon, PokemonClient } from 'pokenode-ts';
import { getURL, logError } from '@/lib/utils';

export const DEFAULT_LIMIT = 12;
const DEFAULT_OFFSET = 0;

const fetchApi = async (url: string) => {
  const response = await fetch(getURL + url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const getPokemon = async (identifier: string | number) => {
  try {
    const data: Pokemon = await fetchApi(`/api/pokemon/${identifier}`);
    return data;
  } catch (error) {
    logError(`getPokemon ${identifier}`, error);
    return null;
  }
};

export const getPaginatedPokemons = async (
  limit?: number,
  offset?: number,
  query?: string,
) => {
  try {
    const finalQuery = query ? `&query=${query}` : '';
    const data: NamedAPIResourceList = await fetchApi(
      `/api/pokemons?limit=${limit || DEFAULT_LIMIT}&offset=${offset || DEFAULT_OFFSET}${finalQuery}`,
    );
    return data;
  } catch (error) {
    logError('getPokemons', error);
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    } as NamedAPIResourceList;
  }
};

// CALLING EXTERNAL API DIRECTLY FOR METADATA AND PRE RENDERING
// generateMetadata and generateStaticParams cannot call internal API routes
// because they not run in build time
export const getPokemonDirectly = async (identifier: string | number) => {
  const API = new PokemonClient();
  if (isNaN(Number(identifier)))
    return await API.getPokemonByName(identifier as string);
  return await API.getPokemonById(Number(identifier));
};

export const getPokemonsDirectly = async () => {
  const API = new PokemonClient();
  const pokemons = await API.listPokemons(0, 10000);
  return Promise.all(
    pokemons.results.map(
      async pokemon => await API.getPokemonByName(pokemon.name),
    ),
  );
};
