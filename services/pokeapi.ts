import axios from "axios";
import { findPokemon, savePokemon } from "./pokemons";

const POKEAPI_ORIGIN = "https://pokeapi.co";
const POKEAPI_BASE_PATH = "/api/v2";

const pokeApi = axios.create({
  baseURL: `${POKEAPI_ORIGIN}${POKEAPI_BASE_PATH}`,
});

function extractAbilityId(abilityUrl: string) {
  const url = new URL(abilityUrl);

  if (url.origin !== POKEAPI_ORIGIN) {
    throw new Error(`Unexpected ability origin: ${url.origin}`);
  }

  const abilityPath = url.pathname.match(/^\/api\/v2\/ability\/(\d+)\/?$/);
  if (!abilityPath) {
    throw new Error(`Unexpected ability path: ${url.pathname}`);
  }

  return abilityPath[1];
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

    const res = await pokeApi.get(`/pokemon/${randomId}`);
    if (res.data.base_experience) {
      pokemon = res.data;
    }
  }

  const abilities = [];
  for (const ab of pokemon.abilities) {
    if (ab.is_hidden) continue;

    const abilityId = extractAbilityId(ab.ability.url);
    const { data } = await pokeApi.get(`/ability/${abilityId}`);
    abilities.push({ ...ab, full: data });
  }

  pokemon.abilities = abilities;

  await savePokemon(pokemon);

  return pokemon;
}
