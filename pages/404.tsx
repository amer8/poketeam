import Head from "next/head";
import Link from "next/link";
import { Roboto } from "next/font/google";
import styles from "@/components/LocalUi.module.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={roboto.className}>
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
