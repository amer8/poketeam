import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteTeam, findTeam } from "@/services/teams";
import PokemonCard from "./PokemonCard";
import styles from "./LocalUi.module.css";

const TeamEditor = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<any[]>([]);

  const handleDeleteTeam = useCallback(async () => {
    setLoading(true);
    await deleteTeam(parseInt(String(router.query.id), 10));
    router.push("/team/list");
  }, [router]);

  useEffect(() => {
    (async () => {
      const team = await findTeam(parseInt(String(router.query.id), 10));
      setPokemons(team.pokemons);
    })();
  }, [router.query.id]);

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
