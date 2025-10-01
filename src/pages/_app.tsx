import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import { MantineProvider } from "@mantine/core";
import theme from "@/utils/theme";
import { AppPropsWithLayout } from "@/layouts/AppLayout";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <MantineProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </MantineProvider>
  );
}
