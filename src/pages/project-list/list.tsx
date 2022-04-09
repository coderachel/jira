import { User } from "./search-panel";

interface Project {
  id: string;
  name: "string";
  personId: string;
  organization: string;
  pin: boolean;
}

interface List {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: List) => {
  return (
    <table>
      <thead>
        <tr>
          <th>项目名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "暂无数据"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
