import Link from "next/link";
import { CheckCircleIcon } from "./AppIcons";
import styles from "./LocalUi.module.css";

const TeamListIntro = () => {
  return (
    <div className={styles.introRoot}>
      <div className={styles.introLead}>
        Here you can create and manage randomly generated teams.
        <br /> The data will be stored in your local browser.
        <br />
      </div>
      <div className={styles.introActions}>
        <Link className={styles.primaryButton} href="/team/create">
          Create team
        </Link>
      </div>
      <div className={styles.introSection}>
        <div className={styles.introPanel}>
          <h2 className={styles.introHeading}>Attribution</h2>
          <ul className={styles.introList}>
            <li className={styles.introListItem}>
              <CheckCircleIcon className={styles.introListIcon} />
              <span>
              <a
                className={styles.textLink}
                href="https://pokeapi.co/"
                rel="noreferrer"
                target="_blank"
              >
                PokéAPI
              </a>{" "}
              is created by{" "}
              <a
                className={styles.textLink}
                href="https://phalt.github.io/"
                rel="noreferrer"
                target="_blank"
              >
                Paul Hallett
              </a>{" "}
              and other{" "}
              <a
                className={styles.textLink}
                href="https://github.com/PokeAPI/pokeapi#contributing"
                rel="noreferrer"
                target="_blank"
              >
                PokéAPI contributors
              </a>{" "}
              around the world. Pokémon and Pokémon character names are
              trademarks of Nintendo.
              </span>
            </li>
            <li className={styles.introListItem}>
              <CheckCircleIcon className={styles.introListIcon} />
              <span>
              <a
                className={styles.textLink}
                href="https://commons.wikimedia.org/wiki/File:Pok%C3%A9_Ball_icon.svg"
                rel="noreferrer"
                target="_blank"
              >
                &quot;Poké Ball icon&quot;
              </a>{" "}
              by Andreuvv is licensed under CC BY-SA 4.0. To view a copy
              of this license, visit{" "}
              <a
                className={styles.textLink}
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                rel="noreferrer"
                target="_blank"
              >
                https://creativecommons.org/licenses/by-sa/4.0/.
              </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamListIntro;
