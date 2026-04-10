import type { Pokemon } from "@/types/pokemon";
import { openDatabase } from "@/utils/database";

const STORE_NAME = "pokemons";

export async function findPokemon(id: number): Promise<Pokemon | undefined> {
  const db = await openDatabase();
  const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
  const value = (await store.get(id)) as Pokemon | undefined;
  return value;
}

export async function savePokemon(pokemon: Pokemon) {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put(pokemon);
  await tx.done;
}
