import MovieCard from "@/components/MovieCard";

const Page = () => {
  return (
    <div className=" grid grid-cols-4 gap-4 p-6">
      {Array.from({ length: 7 }).map(() => (
        <MovieCard
          key={2}
          title="Avengers"
          description="Lorem ipsum dolor sit amet"
          publishedOn="2020"
          poster="https://plus.unsplash.com/premium_photo-1755889381455-ba9accf067cc?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dx"
        />
      ))}
    </div>
  );
};

export default Page;
