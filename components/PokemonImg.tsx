import styles from "./LocalUi.module.css";

interface Props {
  size: string;
  src: string;
  pokemonName: string;
  withTooltip?: boolean;
}

const FALLBACK_IMAGE_SRC = "/Poke_Ball_icon.svg";
const ALLOWED_SPRITE_ORIGINS = new Set(["https://raw.githubusercontent.com"]);

function getSafePokemonImageSrc(src: string) {
  if (!src) {
    return FALLBACK_IMAGE_SRC;
  }

  if (src.startsWith("/") && !src.startsWith("//")) {
    return src;
  }

  try {
    const imageUrl = new URL(src);
    const isAllowedSpriteUrl =
      imageUrl.protocol === "https:" &&
      ALLOWED_SPRITE_ORIGINS.has(imageUrl.origin) &&
      imageUrl.pathname.startsWith("/PokeAPI/sprites/");

    return isAllowedSpriteUrl ? imageUrl.toString() : FALLBACK_IMAGE_SRC;
  } catch {
    return FALLBACK_IMAGE_SRC;
  }
}

const PokemonImg = ({ size, src, pokemonName, withTooltip }: Props) => {
  const tooltipLabel = pokemonName.replaceAll("-", " ");
  const safeSrc = getSafePokemonImageSrc(src);

  if (!withTooltip) {
    return (
      <img
        alt={pokemonName}
        className={styles.pokemonImg}
        src={safeSrc}
        style={{ height: size, width: size }}
      />
    );
  }

  return (
    <span className={styles.pokemonImgWrap} title={tooltipLabel}>
      <img
        alt={pokemonName}
        className={styles.pokemonImg}
        src={safeSrc}
        style={{ height: size, width: size }}
      />
    </span>
  );
};

export default PokemonImg;
