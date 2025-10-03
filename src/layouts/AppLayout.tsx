import Image from "next/image";
import bgImage from "../../public/assets/layout-bg.svg";

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout = ({ children }: IAppLayout) => {
  return (
    <main className="grid grid-rows-[1fr_auto] bg-background min-h-dvh">
      <div className="flex flex-col justify-center items-center">
        {children}
      </div>

      <Image src={bgImage} alt="" className="w-full mt-auto" />
    </main>
  );
};

export default AppLayout;
