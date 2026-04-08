import { Button, Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "./AppIcons";

interface Props {
  onSelectType: (type: string) => void;
  selectedType: string | undefined;
  availableTypes: string[];
}

const TeamListFilter = ({
  availableTypes,
  onSelectType,
  selectedType,
}: Props) => {
  const buttonLabel = selectedType
    ? `Type: ${selectedType}`
    : "All types";

  return (
    <Box>
    <Menu>
      <MenuButton
        as={Button}
        textTransform="capitalize"
        rightIcon={<ChevronDownIcon />}
      >
        {buttonLabel}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectType("")} key="0">
          All types
        </MenuItem>
        {availableTypes.map((type) => (
          <MenuItem
            textTransform="capitalize"
            onClick={() => onSelectType(type)}
            key={type}
          >
            {type}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
    </Box>
  );
};

export default TeamListFilter;
