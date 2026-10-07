import { Table, Td, Tr } from "@/components/ui/table";

export interface UserListEntry {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
}

export function UserList({ users }: { users: readonly UserListEntry[] }) {
  return <Table caption="User management" title="User Management" columns={["Name", "Email", "Role", "Status"]} badgeCount={users.length}>
    {users.map((user) => <Tr key={user.id}>
      <Td>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>{user.role}</Td>
      <Td>{user.status ?? "—"}</Td>
    </Tr>)}
  </Table>;
}
