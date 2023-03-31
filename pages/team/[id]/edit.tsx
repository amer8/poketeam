import Head from "next/head";
import NavBar from "@/components/NavBar";
import TeamEditor from "@/components/TeamEditor";
import { Roboto } from "next/font/google";
import { findTeam } from "@/services/teams";
import { useEffect } from "react";
import { useRouter } from "next/router";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function PageEdit() {
  const router = useRouter();
  useEffect(() => {
    const getTeam = async () => {
      let teams = await findTeam(parseInt(String(router.query.id), 10));
    };
    getTeam();
  }, [router.query.id]);

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
      </Head>
      <main className={roboto.className}>
        <NavBar />
        <TeamEditor />
      </main>
    </>
  );
}
