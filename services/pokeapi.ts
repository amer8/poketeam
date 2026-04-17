import type {
  Pokemon,
  PokemonAbility,
  PokemonAbilityDetails,
  PokemonApiPokemon,
} from "@/types/pokemon";
import { findPokemon, savePokemon } from "./pokemons";

const POKEAPI_ORIGIN = "https://pokeapi.co";
const POKEAPI_BASE_PATH = "/api/v2";
const POKEAPI_BASE_URL = `${POKEAPI_ORIGIN}${POKEAPI_BASE_PATH}`;

class PokeApiError extends Error {
  status: number;

  constructor(status: number, statusText: string) {
    super(`PokeAPI request failed: ${status} ${statusText}`);
    this.name = "PokeApiError";
    this.status = status;
  }
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${POKEAPI_BASE_URL}${path}`);
  if (!response.ok) {
    throw new PokeApiError(response.status, response.statusText);
  }

  return response.json() as Promise<T>;
}

function extractAbilityId(abilityUrl: string) {
  const url = new URL(abilityUrl);

  if (url.origin !== POKEAPI_ORIGIN) {
    throw new Error(`Unexpected ability origin: ${url.origin}`);
  }

  const abilityPath = url.pathname.match(/^\/api\/v2\/ability\/(\d+)\/?$/);
  if (!abilityPath) {
    throw new Error(`Unexpected ability path: ${url.pathname}`);
  }

  return Number.parseInt(abilityPath[1], 10);
}

let cachedPokemonCount: number | undefined;

async function fetchPokemonCount(): Promise<number> {
  if (cachedPokemonCount !== undefined) return cachedPokemonCount;
  const data = await fetchJson<{ count: number }>("/pokemon?limit=1&offset=0");
  cachedPokemonCount = data.count;
  return cachedPokemonCount;
}

function isMissingPokemonError(error: unknown) {
  return error instanceof PokeApiError && error.status === 404;
}

async function fetchPokemonById(pokemonId: number): Promise<Pokemon | null> {
  const cachedPokemon = await findPokemon(pokemonId);
  if (cachedPokemon) {
    return cachedPokemon;
  }

  try {
    const data = await fetchJson<PokemonApiPokemon>(`/pokemon/${pokemonId}`);
    if (data.base_experience == null) {
      return null;
    }

    const abilities = await Promise.all(
      data.abilities
        .filter((ab) => !ab.is_hidden)
        .map(async (ab): Promise<PokemonAbility> => {
          const abilityId = extractAbilityId(ab.ability.url);
          const safeAbilityId = encodeURIComponent(String(abilityId));
          const full = await fetchJson<PokemonAbilityDetails>(
            `/ability/${safeAbilityId}`,
          );
          return { ability: ab.ability, full };
        }),
    );

    const pokemon: Pokemon = {
      ...data,
      abilities,
    };

    await savePokemon(pokemon);

    return pokemon;
  } catch (error) {
    if (isMissingPokemonError(error)) {
      return null;
    }

    throw error;
  }
}

export async function fetchRandomPokemon() {
  const maxPokemon = await fetchPokemonCount();

  while (true) {
    const randomId = Math.floor(Math.random() * maxPokemon) + 1;
    const pokemon = await fetchPokemonById(randomId);
    if (pokemon) {
      return pokemon;
    }
  }
}
