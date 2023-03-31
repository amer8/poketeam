import { openDB } from "idb";

const DB_NAME = "pokeTeam";

export async function openDatabase(storeName: string) {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore("pokemons", {
        keyPath: "id",
        autoIncrement: true,
      });

      db.createObjectStore("teams", {
        keyPath: "id",
        autoIncrement: true,
      });
    },
  });
}
