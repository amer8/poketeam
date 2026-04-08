import router from "next/router";
import ExpTag from "./ExpTag";
import TypeBadge from "./TypeBadge";
import PokemonImg from "./PokemonImg";
import styles from "./LocalUi.module.css";

interface Props {
  teams: any;
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
          {teams.map((team: any) => (
            <tr
              className={styles.teamRow}
              key={team.id}
              onClick={() => router.push(`/team/${team.id}/edit`)}
            >
              <td className={styles.teamCellPrimary}>
                <div className={styles.teamNameRow}>
                  <span className={styles.teamName}>
                    {team.name}
                  </span>
                  <ExpTag baseExp={team.baseExpTotal} />
                </div>
                <br />
                <br />
                <div className={styles.wrapRow}>
                  {Object.entries(team.badges).map((entry: any[]) => (
                    <TypeBadge
                      amount={entry[1]}
                      key={entry[0]}
                      type={entry[0]}
                    />
                  ))}
                </div>
              </td>
              <td>
                <div className={styles.teamPokemonRow}>
                  {team.pokemons.map((pokemon: any) => (
                    <PokemonImg
                      key={team.id + "-" + pokemon.id}
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
