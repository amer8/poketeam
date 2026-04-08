import { useColorMode } from "./ColorMode";
import { DarkModeIcon } from "./AppIcons";
import styles from "./LocalUi.module.css";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <button
      aria-label="Toggle color mode"
      aria-pressed={colorMode === "dark"}
      className={styles.iconButton}
      onClick={toggleColorMode}
      type="button"
    >
      <DarkModeIcon />
    </button>
  );
};

export default ColorModeSwitch;
