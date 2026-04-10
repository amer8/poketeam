import Link from "next/link";
import ColorModeSwitch from "./ColorModeSwitch";
import { useColorMode } from "./ColorMode";
import styles from "./LocalUi.module.css";

const NavBar = () => {
  const { colorMode } = useColorMode();

  return (
    <nav className={styles.navBar}>
      <Link className={styles.navBrand} href="/team/list">
        {/* eslint-disable-next-line @next/next/no-img-element -- local static icon is simpler here than next/image */}
        <img
          alt="Poketeam logo"
          className={styles.navLogo}
          src="Poke_Ball_icon.svg"
        />
        <div className={styles.navTitleGroup}>
          <span className={styles.navTitle}>PokéTeam</span>
          <span className={styles.navSubtitle}>for PokéAPI</span>
        </div>
      </Link>
      <div className={styles.navActions}>
        <ColorModeSwitch />
        <a
          className={styles.button}
          href="https://github.com/amer8/poketeam"
          aria-label="Star buttons/github-buttons on GitHub"
          data-color-mode={colorMode}
          rel="noreferrer"
          target="_blank"
        >
          View on GitHub
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
