import type { StoredTeam, TeamRecord, TeamWithMeta } from "@/types/pokemon";
import { openDatabase } from "@/utils/database";

const STORE_NAME = "teams";

function enrichTeam(team: StoredTeam): TeamWithMeta {
  const badges = new Map<string, number>();
  let baseExpTotal = 0;

  for (const pokemon of team.pokemons) {
    for (const typeObj of pokemon.types) {
      const nextCount = (badges.get(typeObj.type.name) ?? 0) + 1;
      badges.set(typeObj.type.name, nextCount);
    }

    baseExpTotal += pokemon.base_experience;
  }

  return {
    ...team,
    baseExpTotal,
    badges: Object.fromEntries(badges.entries()),
  };
}

export async function listTeams(): Promise<TeamWithMeta[]> {
  const db = await openDatabase();
  const teams = (await db.getAll(STORE_NAME)) as StoredTeam[];
  return teams.map(enrichTeam);
}

export async function findTeam(id: number): Promise<TeamWithMeta | undefined> {
  const db = await openDatabase();
  const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
  const value = (await store.get(id)) as StoredTeam | undefined;
  return value ? enrichTeam(value) : value;
}

export async function deleteTeam(id: number) {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.delete(id);
  await tx.done;
}

export async function saveTeam(team: TeamRecord) {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put(team);
  await tx.done;
}
