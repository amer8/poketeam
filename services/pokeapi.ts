import { findPokemon, savePokemon } from "./pokemons";

const POKEAPI_ORIGIN = "https://pokeapi.co";
const POKEAPI_BASE_PATH = "/api/v2";
const POKEAPI_BASE_URL = `${POKEAPI_ORIGIN}${POKEAPI_BASE_PATH}`;

async function fetchJson(path: string) {
  const response = await fetch(`${POKEAPI_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`PokeAPI request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
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

export async function fetchRandomPokemon() {
  const maxPokemon = 1010;
  let pokemon;

  while (!pokemon) {
    const randomId = Math.floor(Math.random() * maxPokemon) + 1;

    pokemon = await findPokemon(randomId);
    if (pokemon) {
      return pokemon;
    }

    const data = await fetchJson(`/pokemon/${randomId}`);
    if (data.base_experience) {
      pokemon = data;
    }
  }

  const abilities = [];
  for (const ab of pokemon.abilities) {
    if (ab.is_hidden) continue;

    const abilityId = extractAbilityId(ab.ability.url);
    const safeAbilityId = encodeURIComponent(String(abilityId));
    const data = await fetchJson(`/ability/${safeAbilityId}`);
    abilities.push({ ...ab, full: data });
  }

  pokemon.abilities = abilities;

  await savePokemon(pokemon);

  return pokemon;
}
