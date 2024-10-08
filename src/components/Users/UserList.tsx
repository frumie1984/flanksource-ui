import { User } from "@flanksource-ui/api/types/users";
import { useUserAccessStateContext } from "@flanksource-ui/context/UserAccessContext/UserAccessContext";
import { tables } from "@flanksource-ui/context/UserAccessContext/permissions";
import { Age } from "@flanksource-ui/ui/Age";
import { DataTable } from "@flanksource-ui/ui/DataTable";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { CellContext } from "@tanstack/table-core";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { IconButton } from "../../ui/Buttons/IconButton";
import { withAuthorizationAccessCheck } from "../Permissions/AuthorizationAccessCheck";

type UserListProps = {
  data: any[];
  isLoading?: boolean;
  deleteUser: (userId: string) => void;
} & Omit<React.HTMLProps<HTMLDivElement>, "data">;

const DateCell = ({ getValue }: CellContext<User, any>) => (
  <Age from={getValue<string>()} />
);

const getColumns = (
  deleteUser: (userId: string) => void,
  canDeleteUser: boolean
) => {
  let columns = [
    {
      header: "Name",
      accessorKey: "name"
    },
    {
      header: "Email",
      accessorKey: "email",
      Aggregated: ""
    },
    {
      header: "Roles",
      accessorKey: "roles",
      size: 50,
      aggregatedCell: ""
    },
    {
      header: "State",
      accessorKey: "state",
      size: 50,
      aggregatedCell: ""
    },
    {
      header: "Created At",
      accessorKey: "created_at",
      cell: DateCell,
      sortType: "datetime",
      size: 80,
      Aggregated: ""
    }
  ];
  if (canDeleteUser) {
    return [
      ...columns,
      {
        header: "Actions",
        accessorKey: "actions",
        Aggregated: "",
        size: 50,
        cell: ({ row }: any) => {
          const userId = row.original?.id;
          return (
            <ActionMenu
              deleteUser={() => {
                deleteUser(userId);
              }}
            />
          );
        }
      }
    ];
  }
  return columns;
};

function ActionMenu({ deleteUser }: { deleteUser: () => void }) {
  return withAuthorizationAccessCheck(
    <div className="relative">
      <Menu>
        <MenuButton className="min-w-7 rounded-full p-0.5 text-gray-400 hover:text-gray-500">
          <DotsVerticalIcon className="h-6 w-6" />
        </MenuButton>
        <MenuItems
          portal
          anchor="bottom end"
          className="z-10 w-48 divide-y divide-gray-100 rounded-md bg-white shadow-card focus:outline-none"
        >
          <MenuItem
            as="div"
            className="flex w-full cursor-pointer items-center p-3 text-gray-700 hover:bg-gray-200"
            onClick={() => {
              deleteUser();
            }}
          >
            <>
              <IconButton
                className="z-5 mr-2 bg-transparent group-hover:inline-block"
                ovalProps={{
                  stroke: "blue",
                  height: "18px",
                  width: "18px",
                  fill: "transparent"
                }}
                icon={
                  <BsTrash
                    className="border-l-1 border-0 border-gray-200 text-gray-600"
                    size={18}
                  />
                }
              />
              Delete
            </>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>,
    tables.identities,
    "write"
  );
}

export function UserList({
  data,
  isLoading,
  deleteUser,
  className,
  ...rest
}: UserListProps) {
  const { hasResourceAccess, roles } = useUserAccessStateContext();
  const [canDeleteUser, setCanDeleteUser] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const result = await hasResourceAccess(tables.identities, "write");
      setCanDeleteUser(result);
    })();
  }, [hasResourceAccess, roles]);

  const columns = useMemo(() => {
    return getColumns(deleteUser, canDeleteUser);
  }, [canDeleteUser, deleteUser]);

  return (
    <div className={clsx(className)} {...rest} ref={containerRef}>
      <DataTable
        stickyHead
        columns={columns}
        data={data}
        tableStyle={{ borderSpacing: "0" }}
        isLoading={isLoading}
        style={{
          height: `calc(100vh - ${
            containerRef.current?.getBoundingClientRect()?.top ?? 0
          }px)`
        }}
        preferencesKey="user-list"
        savePreferences={false}
      />
    </div>
  );
}
