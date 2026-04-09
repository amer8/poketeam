import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteTeam, findTeam } from "@/services/teams";
import ExpTag from "./ExpTag";
import PokemonCard from "./PokemonCard";
import styles from "./LocalUi.module.css";

const TeamEditor = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [team, setTeam] = useState<any | null>(null);
  const teamId =
    typeof router.query.id === "string"
      ? Number.parseInt(router.query.id, 10)
      : Number.NaN;
  const hasValidTeamId = Number.isInteger(teamId) && teamId > 0;

  const handleDeleteTeam = useCallback(async () => {
    if (!hasValidTeamId) {
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      await deleteTeam(teamId);
      await router.push("/team/list");
    } catch {
      setErrorMessage("Could not delete the team. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [hasValidTeamId, router, teamId]);

  useEffect(() => {
    if (!hasValidTeamId) {
      setTeam(null);
      return;
    }

    (async () => {
      const team = await findTeam(teamId);
      setTeam(team ?? null);
    })();
  }, [hasValidTeamId, teamId]);

  const pokemons = team?.pokemons ?? [];

  return (
    <div className={styles.teamLayout}>
      {team ? (
        <div className={styles.teamSummaryCard}>
          <div className={styles.teamSummaryHeader}>
            <div className={styles.teamNameRow}>
              <span className={styles.teamName}>{team.name}</span>
              <ExpTag baseExp={team.baseExpTotal} />
            </div>
          </div>
          <div className={styles.teamSummaryContent}>
            <div className={styles.cardGrid}>
              {[...pokemons, ...Array(6 - pokemons.length)].map((pokemon, i) => (
                <PokemonCard key={i} pokemon={pokemon} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div className={styles.actionStrip}>
        <button
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={() => router.back()}
          type="button"
        >
          Go back
        </button>
        <button
          className={`${styles.button} ${styles.buttonDanger}`}
          disabled={isLoading}
          onClick={handleDeleteTeam}
          type="button"
        >
          Delete team
        </button>
      </div>
      {errorMessage ? (
        <div aria-live="polite" className={styles.errorText} role="alert">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
};

export default TeamEditor;
