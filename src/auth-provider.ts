import { User } from "pages/project-list/search-panel";

const LOCAL_STORAGE_KEY = "__auth_provider_token__";
const API_URL = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(LOCAL_STORAGE_KEY);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${API_URL}/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  }).then(async (rsp: Response) => {
    if (rsp.ok) {
      return handleUserResponse(await rsp.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${API_URL}/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method: "POST",
  }).then(async (rsp: Response) => {
    if (rsp.ok) {
      return handleUserResponse(await rsp.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const logout = async () => {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
};
