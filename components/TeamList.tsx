import type { TeamWithMeta } from "@/types/pokemon";
import router from "next/router";
import ExpTag from "./ExpTag";
import TypeBadge from "./TypeBadge";
import PokemonImg from "./PokemonImg";
import styles from "./LocalUi.module.css";

interface Props {
  teams: TeamWithMeta[];
}

const TeamList = ({ teams }: Props) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.teamTable}>
        <thead>
          <tr>
            <th className={styles.teamTableHeadCell}>Team</th>
            <th className={styles.teamTableHeadCell}>Pokemon</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr
              className={styles.teamRow}
              key={team.id}
              onClick={() => router.push(`/team/${team.id}/edit/`)}
            >
              <td className={styles.teamCellPrimary}>
                <div className={styles.teamNameRow}>
                  <span className={styles.teamName}>{team.name}</span>
                  <ExpTag baseExp={team.baseExpTotal} />
                </div>
                <br />
                <br />
                <div className={styles.wrapRow}>
                  {Object.entries(team.badges).map(([type, amount]) => (
                    <TypeBadge amount={amount} key={type} type={type} />
                  ))}
                </div>
              </td>
              <td>
                <div className={styles.teamPokemonRow}>
                  {team.pokemons.map((pokemon, index) => (
                    <PokemonImg
                      key={`${team.id}-${pokemon.id}-${index}`}
                      src={pokemon.sprites.front_default}
                      pokemonName={pokemon.name}
                      size={"100px"}
                      withTooltip={true}
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamList;
