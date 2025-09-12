import { NextRequest, NextResponse } from 'next/server';
import { Constants, PokemonClient } from 'pokenode-ts';
import { getURL, logError } from '@/lib/utils';

const API = new PokemonClient();

export async function GET(_req: NextRequest) {
  const searchParams = _req.nextUrl.searchParams;

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (isNaN(limit) || isNaN(offset) || limit < 1 || offset < 0) {
    return NextResponse.json(
      { error: 'Invalid query parameters' },
      { status: 400 },
    );
  }

  try {
    const pokemons = await API.listPokemons(offset, limit);
    const apiURL = Constants.BaseURL.REST;

    return NextResponse.json(
      {
        ...pokemons,
        next: pokemons.next?.replace(apiURL, getURL),
        previous: pokemons.previous?.replace(apiURL, getURL),
        results: pokemons.results.map(pokemon => ({
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
