import { Button } from "@mantine/core";
import Link from "next/link";

const NoMoviesView = () => {
  return (
    <div className="flex flex-col text-balance gap-12 md:gap-8 items-center justify-center px-6">
      <h2 className="text-4xl md:text-5xl font-semibold text-center">
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

export default NoMoviesView;
