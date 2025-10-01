import AppLayout, { NextPageWithLayout } from "@/layouts/AppLayout";

const Page: NextPageWithLayout = () => {
  return <div>Movie bookmark</div>;
};

export default Page;

Page.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
