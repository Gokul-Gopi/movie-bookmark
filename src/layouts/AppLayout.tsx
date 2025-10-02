import Image from "next/image";
import bgImage from "../../public/assets/layout-bg.svg";

interface IAppLayout {
  children: React.ReactNode;
}

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
