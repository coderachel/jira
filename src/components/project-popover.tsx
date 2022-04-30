import styled from "@emotion/styled";
import { Popover, Typography, List, Divider, Button } from "antd";
import { useDispatch } from "react-redux";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";
import { projectListActions } from "pages/project-list/project-list.slice";

export const ProjectPopover = () => {
  const dispatch = useDispatch();
  const { data: project, isLoading } = useProjects();
  const pinnedProjects = project?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        onClick={() => dispatch(projectListActions.openProjectModal())}
        type={"link"}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      项目
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
