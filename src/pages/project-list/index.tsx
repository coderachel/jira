import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import { useMount, useDebounce, useDocumentTitle } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { Test } from "./Test";

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 1000);
  const client = useHttp();
  const { isLoading, error, data: list } = useProjects(debounceParam);

  useDocumentTitle("项目列表", false);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      {/* <Test></Test> */}
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List users={users} dataSource={list || []} loading={isLoading}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
  box-sizing: border-box;
`;
