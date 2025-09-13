import type { MetadataRoute } from 'next';
import { getPokemonsDirectly } from '@/lib/api';
import { getURL } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pokemons = await getPokemonsDirectly();

  return [
    {
      lastModified: new Date(),
      priority: 1,
      url: `${getURL}`,
    },
    ...pokemons.map(pokemon => ({
      lastModified: new Date(),
      priority: 0.8,
      url: `${getURL}/pokemon/${pokemon.name}`,
    })),
    ...pokemons.map(pokemon => ({
      lastModified: new Date(),
      priority: 0.8,
      url: `${getURL}/pokemon/${pokemon.id}`,
    })),
  ];
}
