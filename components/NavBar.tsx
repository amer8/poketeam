import Link from "next/link";
import ColorModeSwitch from "./ColorModeSwitch";
import { useColorMode } from "./ColorMode";
import GitHubButton from "react-github-btn";
import styles from "./LocalUi.module.css";

const NavBar = () => {
  const { colorMode } = useColorMode();
  return (
    <nav className={styles.navBar}>
      <Link className={styles.navBrand} href="/team/list">
          <img
            alt="Poketeam logo"
            className={styles.navLogo}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
          />
        <div className={styles.navTitleGroup}>
            <span className={styles.navTitle}>PokéTeam</span>
            <span className={styles.navSubtitle}>for PokéAPI</span>
        </div>
        </Link>
      <div className={styles.navActions}>
        <ColorModeSwitch />
        <GitHubButton
          href="https://github.com/amer8/poketeam"
          data-color-scheme={colorMode}
          data-size="large"
          aria-label="Star buttons/github-buttons on GitHub"
        >
          Star
        </GitHubButton>
      </div>
    </nav>
  );
};

export default NavBar;
