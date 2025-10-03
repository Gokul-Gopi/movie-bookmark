import {
  Pagination as MantinePaginatiobn,
  PaginationProps,
} from "@mantine/core";

const Pagination = ({ ...props }: PaginationProps) => {
  return (
    <MantinePaginatiobn
      {...props}
      classNames={{
        root: "my-40",
        control:
          "w-auto text-white bg-card font-bold border-none first:bg-transparent last:bg-transparent active:bg-white data-[active=true]:bg-primary active:text-card",
      }}
      previousIcon={() => <span className="font-bold px-2">Prev</span>}
      nextIcon={() => <span className="font-bold px-2">Next</span>}
    />
  );
};

export default Pagination;
