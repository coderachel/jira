import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { useEffect } from "react";
import { User } from "types/user";
import { cleanObject } from "utils";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);

  return result;
};
