import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import theme from "@/utils/theme";
import AppLayout from "@/layouts/AppLayout";
import type { AppProps } from "next/app";
import { useState } from "react";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <AppLayout>
            <Notifications position="top-center" />
            <Component {...pageProps} />
          </AppLayout>
        </HydrationBoundary>
      </QueryClientProvider>
    </MantineProvider>
  );
}
