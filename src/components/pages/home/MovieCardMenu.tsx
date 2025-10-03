import { Icon } from "@iconify/react";
import { ActionIcon, Menu } from "@mantine/core";
import React from "react";

interface IMovieCardMenu {
  onDelete: () => void;
  onEdit: () => void;
}

const MovieCardMenu = ({ onEdit, onDelete }: IMovieCardMenu) => {
  return (
    <Menu
      classNames={{ dropdown: "bg-background" }}
      position="bottom-end"
      shadow="md"
      width={150}
    >
      <Menu.Target>
        <ActionIcon
          className="opacity-0 group-hover:opacity-100 absolute top-2 right-1 transition-opacity duration-500"
          color="white"
          variant="transparent"
        >
          <Icon icon="tabler:dots-vertical" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => onEdit}
          color="primary"
          leftSection={<Icon icon="material-symbols:edit-outline" />}
        >
          Edit
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={onDelete}
          color="red"
          leftSection={<Icon icon="material-symbols:delete-outline" />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MovieCardMenu;
