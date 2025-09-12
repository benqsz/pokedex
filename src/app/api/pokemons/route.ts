import Fuse from 'fuse.js';
import { NextRequest, NextResponse } from 'next/server';
import { Constants, PokemonClient } from 'pokenode-ts';
import { getURL, logError } from '@/lib/utils';

const API = new PokemonClient();

const fuseOptions = {
  keys: ['name'],
  threshold: 0.3,
};

export async function GET(_req: NextRequest) {
  const searchParams = _req.nextUrl.searchParams;

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));
  const query = searchParams.get('query');

  if (isNaN(limit) || isNaN(offset) || limit < 1 || offset < 0) {
    return NextResponse.json(
      { error: 'Invalid query parameters' },
      { status: 400 },
    );
  }

  try {
    const pokemons = await API.listPokemons(offset, 10000);
    const apiURL = Constants.BaseURL.REST;

    const fuse = new Fuse(pokemons.results, fuseOptions);
    const results = query
      ? fuse.search(query).map(result => result.item)
      : pokemons.results;

    return NextResponse.json(
      {
        ...pokemons,
        count: query ? results.length : pokemons.count,
        next: pokemons.next?.replace(apiURL, getURL),
        previous: pokemons.previous?.replace(apiURL, getURL),
        results: results.slice(0, limit).map(pokemon => ({
          ...pokemon,
          url: pokemon.url.replace(apiURL, getURL),
        })),
      },
      { status: 200 },
    );
  } catch (error) {
    logError('api/pokemons', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
