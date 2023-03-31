import { Box, Icon, useColorMode } from "@chakra-ui/react";
import { CgDarkMode } from "react-icons/cg";

const ColorModeSwitch = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Box paddingRight={2}>
      <Icon
        as={CgDarkMode}
        color="gray.500"
        onClick={toggleColorMode}
        cursor="pointer"
        marginTop={-1}
      />
    </Box>
  );
};

export default ColorModeSwitch;
