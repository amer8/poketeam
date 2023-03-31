import Head from "next/head";
import { Roboto } from "next/font/google";
import { Link, VStack } from "@chakra-ui/react";

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
        <VStack align="center" padding="5" w="100%">
          <h1>404: Page Not Found</h1>
          <Link href="/">Back to home</Link>
        </VStack>
      </main>
    </>
  );
}
