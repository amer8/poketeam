import { Tag, Tooltip } from "@chakra-ui/react";

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
      <Tooltip
        label={ability.effect_entries[1]?.effect}
        aria-label={ability.effect_entries[1]?.effect}
      >
        <Tag
          colorScheme="blue"
          size="sm"
          textTransform="capitalize"
          p={0.5}
        >
          {ability.name.replaceAll("-", " ")}
        </Tag>
      </Tooltip>
  );
};

export default AbilityTag;
