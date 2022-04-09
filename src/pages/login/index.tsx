import { stringify } from "querystring";
import { FormEvent } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const login = (param: { username: string; password: string }): void => {
    fetch(`${API_URL}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
      method: "POST",
    }).then(async (rsp: Response) => {
      if (rsp.ok) {
      }
    });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username: string = (
      event.currentTarget.elements[0] as HTMLInputElement
    ).value;
    const password: string = (
      event.currentTarget.elements[1] as HTMLInputElement
    ).value;
    login({ username, password });
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
