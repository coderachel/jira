import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  pin: boolean;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={project.id + ""}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "orgnization",
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
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      rowKey={(item) => item.id}
      {...props}
    ></Table>
  );
};
