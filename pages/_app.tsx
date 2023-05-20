import type { AppProps } from "next/app";
import GlobalContextProvider, { GlobalContextType } from "@/context/global";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider context={pageProps as GlobalContextType}>
      <Component />
    </GlobalContextProvider>
  );
}
