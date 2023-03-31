import { Badge, HStack, Table, TableCaption, TableContainer, Text, Tbody, Td, Th, Thead, Tr, Wrap, WrapItem } from "@chakra-ui/react";
import router from "next/router";
import ExpTag from "./ExpTag";
import TypeBadge from "./TypeBadge";
import PokemonImg from "./PokemonImg";

interface Props {
  teams: any;
}

const TeamList = ({ teams }: Props) => {
  return (
    <TableContainer padding="5" paddingTop={0}>
      <Table variant="simple" size="sm">
        <TableCaption></TableCaption>
        <Thead>
          <Tr>
            <Th>Team</Th>
            <Th padding="0">Pokémons</Th>
          </Tr>
        </Thead>
        <Tbody>
          {teams.map((team: any) => (
            <Tr
              key={team.id}
              onClick={() => router.push(`/team/${team.id}/edit`)}
              cursor="pointer"
            >
              <Td maxWidth="sm">
                <HStack>
                  <Text fontWeight="bold" textTransform="capitalize">
                    {team.name}
                  </Text>{" "}
                  <ExpTag baseExp={team.baseExpTotal} />
                </HStack>
                <br />
                <br />
                <Wrap>
                  {Object.entries(team.badges).map((entry: any[]) => (
                    <WrapItem key={entry[0]} fontSize="x-small">
                      <TypeBadge
                        amount={entry[1]}
                        type={entry[0]}
                      />
                    </WrapItem>
                  ))}
                </Wrap>
              </Td>
              <Td padding="0">
                <Wrap>
                  {team.pokemons.map((pokemon: any) => (
                    <WrapItem key={team.id + "-" + pokemon.id}>
                      <PokemonImg
                        src={pokemon.sprites.front_default}
                        pokemonName={pokemon.name}
                        size={"100px"}
                        withTooltip={true}
                      />
                    </WrapItem>
                  ))}
                </Wrap>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TeamList;
