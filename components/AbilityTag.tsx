import styles from "./LocalUi.module.css";

interface Props {
  ability: {
    effect_entries: {
      effect: string;
    }[];
    name: string;
  };
}

const AbilityTag = ({ ability }: Props) => {
  return (
    <span
      aria-label={ability.effect_entries[1]?.effect}
      className={styles.abilityTag}
      title={ability.effect_entries[1]?.effect}
    >
      {ability.name.replaceAll("-", " ")}
    </span>
  );
};

export default AbilityTag;
