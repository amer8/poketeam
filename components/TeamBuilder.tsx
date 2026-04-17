import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { Pokemon, TeamRecord } from "@/types/pokemon";
import PokemonCard from "./PokemonCard";
import { saveTeam } from "@/services/teams";
import { fetchRandomPokemon } from "@/services/pokeapi";
import { generateTeamName } from "@/utils/teamName";
import styles from "./LocalUi.module.css";

const TeamBuilder = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState<Pokemon[]>([]);
  const trimmedTeamName = teamName.trim();
  const canSaveTeam =
    !isLoading && team.length === 6 && trimmedTeamName.length > 0;

  const handleAddPokemon = async () => {
    setErrorMessage(null);
    setLoading(true);

    try {
      const newPokemon = await fetchRandomPokemon();
      setTeam((currentTeam) => [...currentTeam, newPokemon]);
    } catch {
      setErrorMessage(
        "Could not load a Pokemon. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTeam = useCallback(async () => {
    if (team.length !== 6) {
      return;
    }

    if (!trimmedTeamName) {
      setErrorMessage("Please enter a team name before saving.");
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const teamToSave: TeamRecord = {
        name: trimmedTeamName,
        pokemons: team,
      };
      await saveTeam(teamToSave);
      await router.push("/team/list");
    } catch {
      setErrorMessage("Could not save the team. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [router, team, trimmedTeamName]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && canSaveTeam) {
        void handleSaveTeam();
      }
    },
    [canSaveTeam, handleSaveTeam],
  );

  useEffect(() => {
    setTeamName((currentTeamName) => currentTeamName || generateTeamName());
  }, []);

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
              onChange={(e) => {
                setTeamName(e.target.value);
                setErrorMessage(null);
              }}
              placeholder="Enter your team name"
              style={{ textTransform: "capitalize" }}
            />
            <button
              className={styles.button}
              disabled={!canSaveTeam}
              onClick={handleSaveTeam}
              type="button"
            >
              Save
            </button>
            <span className={styles.helperText}>or</span>
            <span className={styles.kbd}>Enter</span>
          </div>
        )}
      </div>
      {errorMessage ? (
        <div aria-live="polite" className={styles.errorText} role="alert">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
};

export default TeamBuilder;
