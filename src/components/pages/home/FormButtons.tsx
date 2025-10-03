import { cn } from "@/utils/webHelpers";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";

interface IFormButton {
  loading: boolean;
  className?: string;
}

const FormButtons = ({ loading, className }: IFormButton) => {
  const router = useRouter();

  return (
    <div className={cn("flex flex-col xs:flex-row gap-4 lg:gap-2", className)}>
      <Button
        classNames={{
          root: "w-full lg:max-w-[10.5rem] h-[3.5rem]",
          label: "text-base",
        }}
        onClick={() => router.push("/")}
        color="white"
        variant="outline"
      >
        Cancel
      </Button>
      <Button
        classNames={{
          root: "w-full lg:max-w-[10.5rem] h-[3.5rem]",
          label: "text-base",
        }}
        type="submit"
        loading={loading}
      >
        Submit
      </Button>
    </div>
  );
};

export default FormButtons;
