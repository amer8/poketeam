import {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentProps,
} from "next/document";
import Script from "next/script";

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
        <Script
          src={`${publicAssetBasePath}color-mode-init.js`}
          strategy="beforeInteractive"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
