import "../styles/globals.css";
import "@fontsource/poppins";
import { trpc } from "@/libs/trpc";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(App);
