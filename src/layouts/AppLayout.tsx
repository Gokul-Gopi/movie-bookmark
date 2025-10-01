import { NextPage } from "next";
import { AppProps } from "next/app";
import Image from "next/image";
import { ReactElement, ReactNode } from "react";
import bgImage from "../../public/assets/layout-bg.svg";

interface IAppLayout {
  children: React.ReactNode;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const AppLayout = ({ children }: IAppLayout) => {
  return (
    <main className="bg-background min-h-dvh">
      {children}
      <Image
        src={bgImage}
        alt=""
        className="absolute bottom-0 left-0 right-0 w-full"
      />
    </main>
  );
};

export default AppLayout;
