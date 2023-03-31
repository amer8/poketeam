import { Badge } from "@chakra-ui/react";

interface Props {
  amount: number;
  type: string;
}

const TypeBadge = ({ amount, type }: Props) => {
  const colors = new Map([
    ["normal", "#bbbbaa"],
    ["flying", "#96caff"],
    ["ground", "#a67439"],
    ["psychic", "#ff6380"],
    ["water", "#2c9be3"],
    ["electric", "#ffdc00"],
    ["ice", "#74cfc0"],
    ["fairy", "#ec8fe6"],
    ["steel", "#aaaabb"],
    ["rock", "#bbaa66"],
    ["ghost", "#6e4370"],
    ["fire", "#ff421c"],
    ["grass", "#62bc5a"],
    ["poison", "#9553cd"],
    ["dark", "#4e4545"],
    ["fighting", "#bb5544"],
    ["dragon", "#5670be"],
    ["bug", "#92c12a"],
  ]);

  return (
    <>
      {amount > 1 ? <Badge>{amount}×</Badge> : ""}
      <Badge
        bgColor={colors.get(type) || "#000"}
        color={"#fff"}
        textShadow="0px 0px 2px #999"
        fontSize="small"
        size="sm"
        textTransform="capitalize"
      >
        {type}
      </Badge>
    </>
  );
};

export default TypeBadge;
