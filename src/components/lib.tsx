import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};

  > * {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const Fullpage = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

// 类型守卫
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};

export const FullPageLoading = () => {
  return (
    <Fullpage>
      <Spin size={"large"}></Spin>
    </Fullpage>
  );
};

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <Fullpage>
      <DevTools></DevTools>
      <Typography.Text type="danger">{error?.message}</Typography.Text>
    </Fullpage>
  );
};
