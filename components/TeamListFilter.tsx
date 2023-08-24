import { Button, Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

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
  return (
    <Box>
    <Menu>
      <MenuButton
        as={Button}
        textTransform="capitalize"
        rightIcon={<BsChevronDown />}
      >
        {selectedType ? "Filter by: " + selectedType : "Filter by Type"}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onSelectType("")} key="0">
          all Types
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
