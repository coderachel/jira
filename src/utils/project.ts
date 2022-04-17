import { Project } from "pages/project-list/list";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { cleanObject, useMount, useDebounce } from "utils";
import { useEffect } from "react";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();

  useEffect(() => {
    run(
      client("projects", {
        data: cleanObject(param || {}),
      })
    );
  }, [param]);

  return result;
};
