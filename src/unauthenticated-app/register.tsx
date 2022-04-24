import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";
import { useAsync } from "utils/use-async";
import { LongButton } from "unauthenticated-app";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(register(values));
    } catch (e: any) {
      onError(e);
    }
  };

  return (
    <Form action="" onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "请输入密码" }]}
        name={"password"}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
