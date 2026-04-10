export interface AbilityEffectEntry {
  effect: string;
  language?: {
    name?: string;
  };
}

export interface PokemonAbilityDetails {
  effect_entries: AbilityEffectEntry[];
  name: string;
}

export interface PokemonAbilityReference {
  name: string;
  url: string;
}

export interface PokemonAbility {
  ability: PokemonAbilityReference;
  full: PokemonAbilityDetails;
}

export interface PokemonApiAbility {
  ability: PokemonAbilityReference;
  is_hidden: boolean;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
}

export interface PokemonApiPokemon extends Omit<Pokemon, "abilities"> {
  abilities: PokemonApiAbility[];
}

export interface TeamRecord {
  id?: number;
  name: string;
  pokemons: Pokemon[];
}

export interface StoredTeam extends TeamRecord {
  id: number;
}

export interface TeamWithMeta extends StoredTeam {
  badges: Record<string, number>;
  baseExpTotal: number;
}
