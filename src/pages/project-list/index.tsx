import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography, Row, Button } from "antd";
import { useProjects } from "utils/project";
import { useProjectSearchParams } from "./util";
import { useUsers } from "utils/user";

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row justify={"space-between"} align={"middle"}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users || []}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
        refresh={retry}
        projectButton={props.projectButton}
      ></List>
    </Container>
  );
};

// ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
  box-sizing: border-box;
`;
