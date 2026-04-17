import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { TeamWithMeta } from "@/types/pokemon";
import { deleteTeam, findTeam } from "@/services/teams";
import ExpTag from "./ExpTag";
import PokemonCard from "./PokemonCard";
import styles from "./LocalUi.module.css";

interface Props {
  teamIdOverride?: number;
}

const TeamEditor = ({ teamIdOverride }: Props) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [team, setTeam] = useState<TeamWithMeta | null>(null);
  const routeTeamId =
    typeof router.query.id === "string"
      ? Number.parseInt(router.query.id, 10)
      : undefined;
  const hasResolvedTeamId = teamIdOverride !== undefined || router.isReady;
  const teamId = teamIdOverride ?? routeTeamId ?? Number.NaN;
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
    if (!hasResolvedTeamId) {
      return;
    }

    if (!hasValidTeamId) {
      setTeam(null);
      setErrorMessage("Team not found.");
      setLoading(false);
      return;
    }

    let isCancelled = false;

    setErrorMessage(null);
    setLoading(true);

    void (async () => {
      try {
        const nextTeam = await findTeam(teamId);
        if (isCancelled) {
          return;
        }

        setTeam(nextTeam ?? null);
        if (!nextTeam) {
          setErrorMessage("Team not found.");
        }
      } catch {
        if (isCancelled) {
          return;
        }

        setTeam(null);
        setErrorMessage("Could not load the team. Please try again.");
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [hasResolvedTeamId, hasValidTeamId, teamId]);

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
              {[...pokemons, ...Array(6 - pokemons.length)].map(
                (pokemon, i) => (
                  <PokemonCard key={i} pokemon={pokemon} />
                ),
              )}
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
          disabled={isLoading || !team}
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
