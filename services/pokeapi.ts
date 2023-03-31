import axios from "axios";
import { findPokemon, savePokemon } from "./pokemons";

export async function fetchRandomPokemon() {
  const maxPokemon = 1010;
  let pokemon;

  while (!pokemon) {
    const randomId = Math.floor(Math.random() * maxPokemon) + 1;

    pokemon = await findPokemon(randomId);
    if (pokemon) {
      return pokemon;
    }

    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    if (res.data.base_experience) {
      pokemon = res.data;
    }
  }

  const abilities = [];
  for (const ab of pokemon.abilities) {
    if (ab.is_hidden) continue;

    const { data } = await axios.get(ab.ability.url);
    abilities.push({ ...ab, full: data });
  }

  pokemon.abilities = abilities;

  await savePokemon(pokemon);

  return pokemon;
}
