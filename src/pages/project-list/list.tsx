import { User } from "./search-panel";
import { Dropdown, Menu, Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  pin: boolean;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  projectButton: JSX.Element;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              ></Pin>
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={project.id + ""}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>{props.projectButton}</Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      rowKey={(item) => item.id}
      {...props}
    ></Table>
  );
};
