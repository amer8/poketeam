import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteTeam, findTeam } from "@/services/teams";
import PokemonCard from "./PokemonCard";
import styles from "./LocalUi.module.css";

const TeamEditor = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<any[]>([]);
  const teamId =
    typeof router.query.id === "string"
      ? Number.parseInt(router.query.id, 10)
      : Number.NaN;
  const hasValidTeamId = Number.isInteger(teamId) && teamId > 0;

  const handleDeleteTeam = useCallback(async () => {
    if (!hasValidTeamId) {
      return;
    }

    setLoading(true);
    await deleteTeam(teamId);
    router.push("/team/list");
  }, [hasValidTeamId, router, teamId]);

  useEffect(() => {
    if (!hasValidTeamId) {
      setPokemons([]);
      return;
    }

    (async () => {
      const team = await findTeam(teamId);
      setPokemons(team?.pokemons ?? []);
    })();
  }, [hasValidTeamId, teamId]);

  return (
    <div className={styles.teamLayout}>
      <div className={styles.gridShell}>
        <div className={styles.cardGrid}>
          {[...pokemons, ...Array(6 - pokemons.length)].map((pokemon, i) => (
            <PokemonCard key={i} pokemon={pokemon} />
          ))}
        </div>
      </div>
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
    </div>
  );
};

export default TeamEditor;
