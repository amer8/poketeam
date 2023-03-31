import {
  Card,
  Flex,
  Image,
  LightMode,
  Spacer,
  VStack,
  Wrap,
  WrapItem,
  Text,
  Center,
} from "@chakra-ui/react";
import AbilityTag from "./AbilityTag";
import ExpTag from "./ExpTag";
import PokemonImg from "./PokemonImg";
import TypeBadge from "./TypeBadge";

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
    <LightMode>
      <Card
        borderWidth="10px"
        borderRadius="lg"
        p="10px"
        boxShadow="md"
        minH="270px"
        maxW="190px"
        borderColor={"yellow.400"}
        bgGradient="linear(yellow.300 0%, orange.100 25%, yellow.100 50%)"
      >
        <VStack spacing={0}>
          <Flex>
            <Text
              w="100px"
              fontSize="md"
              fontWeight="bold"
              textTransform="capitalize"
            >
              {pokemon.name}
            </Text>
            <Spacer />
            <ExpTag baseExp={pokemon.base_experience} />
          </Flex>

          <PokemonImg
            size="80px"
            src={pokemon.sprites.front_default}
            pokemonName={pokemon.name}
          />
          <Wrap>
            {pokemon.types.map((type: any) => (
              <WrapItem key={type.type.name}>
                <TypeBadge
                  amount={1}
                  type={type.type.name.replaceAll("-", " ")}
                />
              </WrapItem>
            ))}
          </Wrap>

          <Text p="10px" pt={"20px"} fontSize="small" fontWeight={"bold"}>
            Abilities
          </Text>
          <Wrap>
            {pokemon.abilities.map((ability: any) => (
              <WrapItem key={ability.ability.name} cursor="help">
                <AbilityTag ability={ability.full} />
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
      </Card>
    </LightMode>
  ) : (
    <Center
      borderWidth="10px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
      maxWidth="190px"
      minHeight="270px"
    >
        <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" height={150} alt="logo" />
    </Center>
  );
};

export default PokemonCard;
