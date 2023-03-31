import { openDatabase } from "@/utils/database";

const STORE_NAME = "pokemons";

export async function findPokemon(id: number) {
  const db = await openDatabase(STORE_NAME);
  const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
  const value = await store.get(id);
  return value;
}

export async function savePokemon(pokemon: any) {
  const db = await openDatabase(STORE_NAME);
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put(pokemon);
  await tx.done;
}
