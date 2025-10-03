import ConfirmationModal from "@/components/ConfirmationModal";
import { Icon } from "@iconify/react";
import { ActionIcon, Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useLogout } from "@/api/queries/auth.queries";

const Header = () => {
  const router = useRouter();
  const logout = useLogout();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const onLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        router.push("/signin");
      },
    });

    notifications.show({
      message: "Logged out",
      color: "green",
    });
  };

  return (
    <section className="flex justify-between w-full items-center my-28">
      <div className="flex gap-3 items-center">
        <h2 className="text-5xl font-semibold">My movies</h2>
        <ActionIcon
          component={Link}
          href="/add-movie"
          variant="transparent"
          color="white"
          size="xl"
        >
          <Icon icon="tabler:circle-plus" className="text-[32px] mt-1.5" />
        </ActionIcon>
      </div>

      <Button
        onClick={() => setLogoutModalOpen(true)}
        classNames={{ label: "text-base", section: "text-[1.8rem] ml-3" }}
        rightSection={<Icon icon="tabler:logout" />}
        variant="transparent"
        color="white"
      >
        Logout
      </Button>

      <ConfirmationModal
        title="Are you sure you want to logout?"
        opened={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={onLogout}
        loading={logout.isPending}
        closeOnClickOutside={!logout.isPending}
        withCloseButton={!logout.isPending}
      />
    </section>
  );
};

export default Header;
