import "@@/common/styles/globals.css";
import { theme } from "@@/common/styles/theme";
import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DobermannApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Theme appearance="dark" accentColor="green">
          <Component {...pageProps} />
        </Theme>
      </ThemeProvider>
    </>
  );
}

export default DobermannApp;
