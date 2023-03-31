import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Text,
  SimpleGrid,
  Kbd,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import nameGenerator from "project-name-generator";
import PokemonCard from "./PokemonCard";
import { saveTeam } from "@/services/teams";
import { fetchRandomPokemon } from "@/services/pokeapi";

const TeamBuilder = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState(
    nameGenerator({ words: 2, alliterative: true }).spaced
  );
  const [team, setTeam] = useState<any[]>([]);

  const handleAddPokemon = async () => {
    setLoading(true);
    const newPokemon = await fetchRandomPokemon();
    setTeam([...team, newPokemon]);
    setLoading(false);
  };

  const handleSaveTeam = useCallback(async () => {
    setLoading(true);
    await saveTeam({ name: teamName, pokemons: team });
    router.push("/team/list");
  }, [router, team, teamName]);

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === "Enter" && team.length === 6 && teamName.length) {
        handleSaveTeam();
      }
    },
    [handleSaveTeam, team.length, teamName.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <VStack align="center" padding="5" w="100%">
      <Box w="100%" alignItems="center" maxWidth="1300px">
        <SimpleGrid minChildWidth="175px" spacing={2}>
          {[...team, ...Array(6 - team.length)].map((pokemon, i) => (
            <PokemonCard key={i} pokemon={pokemon} />
          ))}
        </SimpleGrid>
      </Box>
      <HStack padding="20px">
        {team.length < 6 ? (
          <HStack padding="20px" spacing={6}>
            <Button onClick={() => router.back()} colorScheme="gray">
              Go back
            </Button>
            <Button
              onClick={handleAddPokemon}
              colorScheme="yellow"
              isLoading={isLoading}
            >
              Gotta Catch &apos;Em All
            </Button>
          </HStack>
        ) : (
          <FormControl>
            <HStack>
              <Input
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your team name"
                textTransform="capitalize"
              />
              <Button onClick={handleSaveTeam} colorScheme="yellow">
                Save
              </Button>
              <Text>or</Text>
              <span>
                <Kbd>Enter</Kbd>
              </span>
            </HStack>
          </FormControl>
        )}
      </HStack>
    </VStack>
  );
};

export default TeamBuilder;
