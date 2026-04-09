const TEAM_NAME_PREFIXES = [
  "Agile",
  "Brave",
  "Clever",
  "Daring",
  "Electric",
  "Fearless",
  "Gallant",
  "Heroic",
  "Iron",
  "Jubilant",
  "Keen",
  "Legendary",
  "Mighty",
  "Nimble",
  "Omega",
  "Power",
  "Quick",
  "Rapid",
  "Stealth",
  "Thunder",
  "Ultra",
  "Victory",
  "Wild",
  "Zen",
] as const;

const TEAM_NAME_SUFFIXES = [
  "Aces",
  "Battlers",
  "Champions",
  "Dynamos",
  "Elites",
  "Flyers",
  "Guardians",
  "Hunters",
  "Icons",
  "Juggernauts",
  "Keepers",
  "Launchers",
  "Masters",
  "Navigators",
  "Outriders",
  "Patrol",
  "Questers",
  "Rangers",
  "Strikers",
  "Tamers",
  "United",
  "Vanguards",
  "Wanderers",
  "Zephyrs",
] as const;

export function generateTeamName() {
  const prefixIndex = Math.floor(Math.random() * TEAM_NAME_PREFIXES.length);
  const suffixIndex = Math.floor(Math.random() * TEAM_NAME_SUFFIXES.length);

  return `${TEAM_NAME_PREFIXES[prefixIndex]} ${TEAM_NAME_SUFFIXES[suffixIndex]}`;
}
