import type { MetadataRoute } from 'next';
import { getPaginatedPokemons, getPokemon } from '@/lib/api';
import { getURL } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paginatedPokemons = await getPaginatedPokemons();
  const pokemons = await Promise.all(
    paginatedPokemons.results.map(async pokemon => {
      return await getPokemon(pokemon.name);
    }),
  );

  return [
    {
      lastModified: new Date(),
      priority: 1,
      url: `${getURL}`,
    },
    ...pokemons
      .filter(pokemon => pokemon !== null)
      .map(pokemon => ({
        lastModified: new Date(),
        priority: 0.8,
        url: `${getURL}/pokemon/${pokemon?.name}`,
      })),
    ...pokemons
      .filter(pokemon => pokemon !== null)
      .map(pokemon => ({
        lastModified: new Date(),
        priority: 0.8,
        url: `${getURL}/pokemon/${pokemon.id}`,
      })),
  ];
}
