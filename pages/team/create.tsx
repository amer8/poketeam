import Head from "next/head";
import NavBar from "@/components/NavBar";
import TeamBuilder from "@/components/TeamBuilder";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

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
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
          sizes="any"
        />
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"
          type="image/svg+xml"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/192px-Pok%C3%A9_Ball_icon.svg.png" />
      </Head>
      <main className={roboto.className}>
        <NavBar />
        <TeamBuilder />
      </main>
    </>
  );
}
