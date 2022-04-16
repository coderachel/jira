import { User } from "./search-panel";
import { Table } from "antd";

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
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "暂无数据"}
              </span>
            );
          },
        },
      ]}
      rowKey={(item) => item.id}
      dataSource={list}
    ></Table>
  );
};
