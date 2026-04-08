import styles from "./LocalUi.module.css";

interface Props {
  size: string;
  src: string;
  pokemonName: string;
  withTooltip?: boolean;
}

const PokemonImg = ({ size, src, pokemonName, withTooltip}: Props) => {
  const tooltipLabel = pokemonName.replaceAll("-", " ");

  if (!withTooltip) {
    return (
      <img
        alt={pokemonName}
        className={styles.pokemonImg}
        src={src}
        style={{ height: size, width: size }}
      />
    );
  }

  return (
    <span className={styles.pokemonImgWrap} title={tooltipLabel}>
      <img
        alt={pokemonName}
        className={styles.pokemonImg}
        src={src}
        style={{ height: size, width: size }}
      />
    </span>
  );
};

export default PokemonImg;
