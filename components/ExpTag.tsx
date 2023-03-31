import { Tag, TagLabel } from "@chakra-ui/react";

interface Props {
  baseExp: number;
}

const ExpTag = ({ baseExp }: Props) => {
  return (
    <Tag>
      <TagLabel fontSize="xx-small" mr="0.5">
        EXP
      </TagLabel>
      <TagLabel fontSize="md" textTransform="capitalize" fontWeight="bold">
        {baseExp || "?"}
      </TagLabel>
    </Tag>
  );
};

export default ExpTag;
