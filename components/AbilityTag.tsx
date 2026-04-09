import styles from "./LocalUi.module.css";

interface Props {
  ability: {
    effect_entries: {
      effect: string;
      language?: {
        name?: string;
      };
    }[];
    name: string;
  };
}

const AbilityTag = ({ ability }: Props) => {
  const tooltipText =
    ability.effect_entries.find((entry) => entry.language?.name === "en")
      ?.effect ?? ability.effect_entries[0]?.effect;

  return (
    <span
      aria-label={tooltipText}
      className={styles.abilityTag}
      title={tooltipText}
    >
      {ability.name.replaceAll("-", " ")}
    </span>
  );
};

export default AbilityTag;
