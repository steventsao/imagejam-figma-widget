import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { myCache } from "../my-cache";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      {/* <Head>
        <title>Page title</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head> */}

      <MantineProvider
        emotionCache={myCache}
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}