import { Html, Head, Main, NextScript } from "next/document";

const colorModeInitScript = `
  (function () {
    try {
      var key = "color-mode";
      var stored = window.localStorage.getItem(key);
      var mode = stored === "light" || stored === "dark"
        ? stored
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.dataset.colorMode = mode;
    } catch (error) {
      document.documentElement.dataset.colorMode = "light";
    }
  })();
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: colorModeInitScript }} />
        <Main />
        <NextScript />
        <script async defer src="https://buttons.github.io/buttons.js"></script>
      </body>
    </Html>
  );
}
