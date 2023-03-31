import { openDatabase } from "@/utils/database";

const STORE_NAME = "teams";

export async function listTeams() {
  const db = await openDatabase(STORE_NAME);
  const teams = await db.getAll(STORE_NAME);
  return teams.map((team) => {
    const badges = new Map();
    let baseExpTotal = 0;
    for (const pokemon of team.pokemons) {
      for (const typeObj of pokemon.types) {
        if (badges.has(typeObj.type.name)) {
          badges.set(
            typeObj.type.name,
            (badges.get(typeObj.type.name) as number) + 1
          );
        } else {
          badges.set(typeObj.type.name, 1);
        }
      }

      baseExpTotal += pokemon.base_experience;
    }

    team.baseExpTotal = baseExpTotal;
    team.badges = Object.fromEntries(badges.entries());

    return team;
  });
}

export async function findTeam(id: number) {
  const db = await openDatabase(STORE_NAME);
  const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
  const value = await store.get(id);
  return value;
}

export async function deleteTeam(id: number) {
  const db = await openDatabase(STORE_NAME);
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.delete(id);
  await tx.done;
}

export async function saveTeam(team: any) {
  const db = await openDatabase(STORE_NAME);
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put(team);
  await tx.done;
}
