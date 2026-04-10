import Head from "next/head";
import NavBar from "@/components/NavBar";
import TeamBuilder from "@/components/TeamBuilder";

export default function PageCreate() {
  return (
    <>
      <Head>
        <title>Create team</title>
        <meta
          name="description"
          content="Pokeapi team let's build your dream team"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <NavBar />
        <TeamBuilder />
      </main>
    </>
  );
}
