import {
  NamedAPIResourceList,
  Pokemon,
  PokemonClient,
  PokemonSprites,
} from 'pokenode-ts';
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

export function getPokemonImgs(sprites: PokemonSprites) {
  const orderedSprites: string[] = [];

  if (sprites?.other?.['official-artwork']?.front_default)
    orderedSprites.push(sprites.other['official-artwork'].front_default);

  const spriteTypes: (keyof PokemonSprites)[] = [
    'front_default',
    'back_default',
    'front_shiny',
    'back_shiny',
    'front_female',
    'back_female',
    'front_shiny_female',
    'back_shiny_female',
  ];

  for (const type of spriteTypes)
    if (sprites[type]) orderedSprites.push(sprites[type] as string);

  return orderedSprites;
}

export const getTypeColor = (type: string) => {
  const colors = {
    bug: '#A6B91A',
    dark: '#705746',
    dragon: '#6F35FC',
    electric: '#F7D02C',
    fairy: '#D685AD',
    fighting: '#C22E28',
    fire: '#EE8130',
    flying: '#A98FF3',
    ghost: '#735797',
    grass: '#7AC74C',
    ground: '#E2BF65',
    ice: '#96D9D6',
    normal: '#A8A77A',
    poison: '#A33EA1',
    psychic: '#F95587',
    rock: '#B6A136',
    steel: '#B7B7CE',
    water: '#6390F0',
  };

  return colors[type as keyof typeof colors] || '#81a596';
};

// CALLING EXTERNAL API DIRECTLY FOR PRE RENDERING
// generateStaticParams cannot call internal API routes
// because they not run in build time

export const getPokemonsDirectly = async () => {
  const API = new PokemonClient();
  const pokemons = await API.listPokemons(0, 10000);
  return Promise.all(
    pokemons.results.map(
      async pokemon => await API.getPokemonByName(pokemon.name),
    ),
  );
};
