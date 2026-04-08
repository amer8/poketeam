import type { AppProps } from "next/app";
import { ColorModeProvider } from "@/components/ColorMode";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <Component {...pageProps} />
    </ColorModeProvider>
  );
}
