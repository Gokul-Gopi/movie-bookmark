import AppLayout, { NextPageWithLayout } from "@/layouts/AppLayout";
import { Button } from "@mantine/core";

const Page: NextPageWithLayout = () => {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Button size="xl">Home</Button>
    </div>
  );
};

export default Page;

Page.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
