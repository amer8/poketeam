import {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentProps,
} from "next/document";

export default function Document({ __NEXT_DATA__ }: DocumentProps) {
  const publicAssetBasePath = __NEXT_DATA__.assetPrefix
    ? `${__NEXT_DATA__.assetPrefix.replace(/\/$/, "")}/`
    : "/";

  return (
    <Html lang="en">
      <Head>
        <base href={publicAssetBasePath} />
        <link
          rel="icon"
          href={`${publicAssetBasePath}Poke_Ball_icon.svg`}
          sizes="any"
        />
        <link
          rel="icon"
          href={`${publicAssetBasePath}Poke_Ball_icon.svg`}
          type="image/svg+xml"
        />
        <link
          rel="apple-touch-icon"
          href={`${publicAssetBasePath}Poke_Ball_icon.svg`}
        />
      </Head>
      <body>
        <script src={`${publicAssetBasePath}color-mode-init.js`} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
