import type { MetadataRoute } from 'next';
import { getURL } from '@/lib/utils';
import { getPokemonsDirectly } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pokemons = await getPokemonsDirectly();

  return [
    {
      url: `${getURL}`,
      lastModified: new Date(),
      priority: 1,
    },
    ...pokemons.map(pokemon => ({
      url: `${getURL}/pokemon/${pokemon.name}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...pokemons.map(pokemon => ({
      url: `${getURL}/pokemon/${pokemon.id}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
