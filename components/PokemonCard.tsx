import AbilityTag from "./AbilityTag";
import ExpTag from "./ExpTag";
import PokemonImg from "./PokemonImg";
import TypeBadge from "./TypeBadge";
import styles from "./LocalUi.module.css";

interface Props {
  pokemon: {
    name: string;
    base_experience: number;
    sprites: {
      front_default: string;
    },
    types: {
      type: {
        name: string;
      }
    }[];
    abilities: {
      ability: {
        name: string;
      }
    }[];
    full: any;
  };
}

const PokemonCard = ({ pokemon }: Props) => {
  return pokemon ? (
    <article className={styles.pokemonCard}>
      <div className={styles.pokemonCardInner}>
        <div className={styles.pokemonCardHeader}>
          <div className={styles.pokemonCardTitle}>
            {pokemon.name}
          </div>
          <ExpTag baseExp={pokemon.base_experience} />
        </div>
        <div className={styles.pokemonCardMedia}>
          <PokemonImg
            size="96px"
            src={pokemon.sprites.front_default}
            pokemonName={pokemon.name}
          />
        </div>
        <div className={styles.pokemonCardMeta}>
          <div className={styles.pokemonCardBlock}>
            <div className={styles.wrapRow}>
              {pokemon.types.map((type: any) => (
                <TypeBadge
                  amount={1}
                  key={type.type.name}
                  type={type.type.name.replaceAll("-", " ")}
                />
              ))}
            </div>
          </div>

          <div className={styles.pokemonCardBlock}>
            <div className={styles.pokemonCardSection}>Abilities</div>
            <div className={styles.wrapRow}>
              {pokemon.abilities.map((ability: any) => (
                <AbilityTag ability={ability.full} key={ability.ability.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  ) : (
    <div className={styles.pokemonCardEmpty}>
      <div className={styles.pokemonCardEmptyInner}>
        <img
          alt="Pokeball logo"
          className={styles.pokemonCardEmptyLogo}
          src="/Poke_Ball_icon.svg"
        />
      </div>
    </div>
  );
};

export default PokemonCard;
