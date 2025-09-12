import { NamedAPIResourceList, Pokemon } from 'pokenode-ts';
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

export const getPokemonImages = (sprites: Pokemon['sprites']) => {
  const images: string[] = [];
  if (sprites.front_default) images.push(sprites.front_default);
  for (const [key, value] of Object.entries(sprites))
    if (key !== 'front_default' && typeof value === 'string' && value)
      images.push(value);

  return images;
};
