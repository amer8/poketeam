import { Button, Center, Heading, Link, List, ListIcon, ListItem, VStack } from "@chakra-ui/react";
import router from "next/router";
import { MdCheckCircle } from "react-icons/md";

const TeamListIntro = () => {
  return (
    <>
      <Center padding={20}>
        Here you can create and manage randomly generated teams.
        <br /> The data will be stored in your local browser.
        <br />
      </Center>
      <Center>
        <Button
          onClick={() => router.push("/team/create")}
          colorScheme="yellow"
        >
          Create team
        </Button>
      </Center>
      <Center padding={20}>
        <VStack>
          <Heading as="h2" size="small">
            Attribution
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Link
                textDecoration="underline"
                href="https://pokeapi.co/"
                target="_blank"
              >
                PokéAPI
              </Link>{" "}
              is created by{" "}
              <Link
                textDecoration="underline"
                href="https://phalt.github.io/"
                target="_blank"
              >
                Paul Hallett
              </Link>{" "}
              and other{" "}
              <Link
                textDecoration="underline"
                href="https://github.com/PokeAPI/pokeapi#contributing"
                target="_blank"
              >
                PokéAPI contributors
              </Link>{" "}
              around the world. Pokémon and Pokémon character names are
              trademarks of Nintendo.
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Link
                textDecoration="underline"
                href="https://commons.wikimedia.org/wiki/File:Pok%C3%A9_Ball_icon.svg"
                target="_blank"
              >
                &quot;Poké Ball icon&quot;
              </Link>{" "}
              by Andreuvv is licensed under CC BY-SA 4.0. To view a copy
              of this license, visit{" "}
              <Link
                textDecoration="underline"
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
              >
                https://creativecommons.org/licenses/by-sa/4.0/.
              </Link>
            </ListItem>
          </List>
        </VStack>
      </Center>
    </>
  );
};

export default TeamListIntro;
