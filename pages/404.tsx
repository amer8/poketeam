import Head from "next/head";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import NavBar from "@/components/NavBar";
import TeamEditor from "@/components/TeamEditor";
import TeamListLoading from "@/components/TeamListLoading";
import styles from "@/components/LocalUi.module.css";

function extractEditTeamId(pathname: string) {
  const match = pathname.match(/\/team\/(\d+)\/edit\/?$/);
  if (!match) {
    return null;
  }

  const teamId = Number.parseInt(match[1], 10);
  return Number.isInteger(teamId) && teamId > 0 ? teamId : null;
}

function subscribeToPathname(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => {
    window.removeEventListener("popstate", onStoreChange);
  };
}

function getPathnameSnapshot() {
  return window.location.pathname;
}

function getServerPathnameSnapshot() {
  return null;
}

export default function NotFoundPage() {
  const pathname = useSyncExternalStore(
    subscribeToPathname,
    getPathnameSnapshot,
    getServerPathnameSnapshot,
  );
  const hasResolvedFallback = pathname !== null;
  const fallbackTeamId = pathname ? extractEditTeamId(pathname) : null;
  const isEditFallback = typeof fallbackTeamId === "number";

  return (
    <>
      <Head>
        <title>{isEditFallback ? "Update team" : "Not found"}</title>
        <meta
          name="description"
          content="Pokeapi team let's build your dream team"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {isEditFallback ? (
          <>
            <NavBar />
            <TeamEditor teamIdOverride={fallbackTeamId} />
          </>
        ) : hasResolvedFallback ? (
          <div className={styles.notFoundPage}>
            <div className={styles.notFoundCard}>
              <h1>404: Page Not Found</h1>
              <Link className={styles.textLink} href="/">
                Back to home
              </Link>
            </div>
          </div>
        ) : (
          <TeamListLoading />
        )}
      </main>
    </>
  );
}
