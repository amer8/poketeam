import { Box, useColorMode } from "@chakra-ui/react";
import { DarkModeIcon } from "./AppIcons";

const ColorModeSwitch = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Box paddingRight={2}>
      <DarkModeIcon
        color="gray.500"
        onClick={toggleColorMode}
        cursor="pointer"
        marginTop={-1}
      />
    </Box>
  );
};

export default ColorModeSwitch;
