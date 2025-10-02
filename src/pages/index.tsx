import { Button } from "@mantine/core";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen">
      <h2 className="text-5xl font-semibold text-center">
        Your movie list is empty
      </h2>
      <Button
        component={Link}
        href="/add-movie"
        classNames={{ label: "text-base" }}
        h={56}
        px={28}
      >
        Add a new movie
      </Button>
    </div>
  );
};

export default Page;
