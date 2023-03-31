import { Image, Tooltip } from "@chakra-ui/react";

interface Props {
  size: string;
  src: string;
  pokemonName: string;
  withTooltip?: boolean;
}

const PokemonImg = ({ size, src, pokemonName, withTooltip}: Props) => {
  if (!withTooltip) {
    return (
      <Image boxSize={size} objectFit="contain" src={src} alt={pokemonName} />
    );
  }

  return (
    <Tooltip
      textTransform="capitalize"
      label={pokemonName}
      aria-label={pokemonName}
    >
      <Image boxSize={size} objectFit="contain" src={src} alt={pokemonName} />
    </Tooltip>
  );
};

export default PokemonImg;
