import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import nameGenerator from "project-name-generator";
import PokemonCard from "./PokemonCard";
import { saveTeam } from "@/services/teams";
import { fetchRandomPokemon } from "@/services/pokeapi";
import styles from "./LocalUi.module.css";

const TeamBuilder = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState(
    nameGenerator({ words: 2, alliterative: true }).spaced
  );
  const [team, setTeam] = useState<any[]>([]);

  const handleAddPokemon = async () => {
    setLoading(true);
    const newPokemon = await fetchRandomPokemon();
    setTeam([...team, newPokemon]);
    setLoading(false);
  };

  const handleSaveTeam = useCallback(async () => {
    setLoading(true);
    await saveTeam({ name: teamName, pokemons: team });
    router.push("/team/list");
  }, [router, team, teamName]);

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === "Enter" && team.length === 6 && teamName.length) {
        handleSaveTeam();
      }
    },
    [handleSaveTeam, team.length, teamName.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.teamLayout}>
      <div className={styles.gridShell}>
        <div className={styles.cardGrid}>
          {[...team, ...Array(6 - team.length)].map((pokemon, i) => (
            <PokemonCard key={i} pokemon={pokemon} />
          ))}
        </div>
      </div>
      <div className={styles.actionStrip}>
        {team.length < 6 ? (
          <div className={styles.actionStrip}>
            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={() => router.back()}
              type="button"
            >
              Go back
            </button>
            <button
              className={styles.button}
              disabled={isLoading}
              onClick={handleAddPokemon}
              type="button"
            >
              Gotta Catch &apos;Em All
            </button>
          </div>
        ) : (
          <div className={styles.inlineForm}>
              <input
                className={styles.textInput}
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your team name"
                style={{ textTransform: "capitalize" }}
              />
              <button className={styles.button} onClick={handleSaveTeam} type="button">
                Save
              </button>
              <span className={styles.helperText}>or</span>
              <span className={styles.kbd}>Enter</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamBuilder;
