import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  VStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "@chakra-ui/react";
import GitHubButton from "react-github-btn";

const NavBar = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex>
      <HStack>
        <Link href="/team/list">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" height={50} alt="logo" ml={3} />
        </Link>
        <Box p="3" pl={0}>
          <VStack>
            <Heading size="md">PokéTeam</Heading>
            <Text fontSize="xs" as="sub" height={2.5}>
              for PokéAPI
            </Text>
          </VStack>
        </Box>
      </HStack>
      <Spacer />
      <HStack paddingRight={5}>
        <ColorModeSwitch />
        <GitHubButton
          href="https://github.com/amer8/poketeam"
          data-color-scheme={colorMode}
          data-size="large"
          aria-label="Star buttons/github-buttons on GitHub"
        >
          Star
        </GitHubButton>
      </HStack>
    </Flex>
  );
};

export default NavBar;
