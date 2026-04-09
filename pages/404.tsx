import Head from "next/head";
import Link from "next/link";
import styles from "@/components/LocalUi.module.css";

export default function TeamList() {
  return (
    <>
      <Head>
        <title>Not found</title>
        <meta
          name="description"
          content="Pokeapi team let's build your dream team"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Poke_Ball_icon.svg" />
      </Head>
      <main>
        <div className={styles.notFoundPage}>
          <div className={styles.notFoundCard}>
          <h1>404: Page Not Found</h1>
          <Link className={styles.textLink} href="/">
            Back to home
          </Link>
          </div>
        </div>
      </main>
    </>
  );
}
