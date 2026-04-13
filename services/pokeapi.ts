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

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${POKEAPI_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(
      `PokeAPI request failed: ${response.status} ${response.statusText}`,
    );
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

export async function fetchRandomPokemon() {
  const maxPokemon = await fetchPokemonCount();
  let pokemon: Pokemon | undefined;

  while (!pokemon) {
    const randomId = Math.floor(Math.random() * maxPokemon) + 1;

    pokemon = await findPokemon(randomId);
    if (pokemon) {
      return pokemon;
    }

    const data = await fetchJson<PokemonApiPokemon>(`/pokemon/${randomId}`);
    if (data.base_experience) {
      const abilities: PokemonAbility[] = [];
      for (const ab of data.abilities) {
        if (ab.is_hidden) continue;

        const abilityId = extractAbilityId(ab.ability.url);
        const safeAbilityId = encodeURIComponent(String(abilityId));
        const full = await fetchJson<PokemonAbilityDetails>(
          `/ability/${safeAbilityId}`,
        );

        abilities.push({ ability: ab.ability, full });
      }

      pokemon = {
        ...data,
        abilities,
      };
    }
  }

  await savePokemon(pokemon);

  return pokemon;
}
