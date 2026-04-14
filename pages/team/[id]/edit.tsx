import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import NavBar from "@/components/NavBar";
import TeamEditor from "@/components/TeamEditor";

// No HTML files are emitted for specific ids — team ids are created at runtime
// in IndexedDB, so they can't be known at build time. In-app navigation is
// handled by Next's client router, and direct URL loads fall back to the SPA
// 404 page, which detects this route and renders the editor.
export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: false,
});

export const getStaticProps: GetStaticProps = () => ({ props: {} });

export default function PageEdit() {
  return (
    <>
      <Head>
        <title>Update team</title>
        <meta
          name="description"
          content="Pokeapi team let's build your dream team"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <NavBar />
        <TeamEditor />
      </main>
    </>
  );
}
