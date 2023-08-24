import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  sortOptions: any;
  selectedOption: any;
  onSelectOption: (type: string) => void;
}

const TeamSortBY = ({
  sortOptions,
  selectedOption,
  onSelectOption
}: Props) => {
  return (
    <Box ml={8}>
        <Menu>
            <MenuButton
                as={Button}
                textTransform="capitalize"
                rightIcon={<BsChevronDown />}
            >
              {selectedOption ? "Sort by: " + selectedOption.label : "Sort by:"}
            </MenuButton>
            <MenuList>
                {sortOptions.map((sortOption: any) => (
                  <MenuItem
                    textTransform="capitalize"
                    key={sortOption.id}
                    onClick={() => onSelectOption(sortOption)}
                    >
                    {sortOption.label}
                  </MenuItem>
                ))}
            </MenuList>
        </Menu>
    </Box>
  );
};

export default TeamSortBY;