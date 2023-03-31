import React, { useCallback, useEffect, useState } from "react";
import { Box, VStack, Button, HStack, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { deleteTeam, findTeam } from "@/services/teams";
import PokemonCard from "./PokemonCard";

const TeamEditor = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<any[]>([]);

  const handleDeleteTeam = useCallback(async () => {
    setLoading(true);
    await deleteTeam(parseInt(String(router.query.id), 10));
    router.push("/team/list");
  }, [router]);

  useEffect(() => {
    (async () => {
      const team = await findTeam(parseInt(String(router.query.id), 10));
      setPokemons(team.pokemons);
    })();
  }, [router.query.id]);

  return (
    <VStack align="center" padding="5" w="100%">
      <Box w="100%" alignItems="center" maxWidth="1300px">
        <SimpleGrid minChildWidth="175px" spacing={2}>
          {[...pokemons, ...Array(6 - pokemons.length)].map((pokemon, i) => (
            <PokemonCard key={i} pokemon={pokemon} />
          ))}
        </SimpleGrid>
      </Box>
      <HStack padding="20px" spacing={6}>
        <Button onClick={() => router.back()} colorScheme="gray">
          Go back
        </Button>
        <Button
          onClick={handleDeleteTeam}
          colorScheme="red"
          isLoading={isLoading}
        >
          Delete team
        </Button>
      </HStack>
    </VStack>
  );
};

export default TeamEditor;
