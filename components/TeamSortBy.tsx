import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "./AppIcons";

interface SortOption {
  id: number;
  label: string;
  value: "exp-desc" | "exp-asc" | "name-asc" | "name-desc";
}

interface Props {
  sortOptions: SortOption[];
  selectedOption: SortOption | undefined;
  onSelectOption: (option: SortOption) => void;
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
                rightIcon={<ChevronDownIcon />}
            >
              {selectedOption ? selectedOption.label : "Sort teams"}
            </MenuButton>
            <MenuList>
                {sortOptions.map((sortOption) => (
                  <MenuItem
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
