import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useEffect } from "react";
import * as qs from "qs";
import { cleanObject, useMount, useDebounce } from "utils";

const API_URL = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 1000);

  useEffect(() => {
    fetch(
      `${API_URL}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (rsp) => {
      if (rsp.ok) {
        setList(await rsp.json());
      }
    });
  }, [debounceParam]);

  useMount(() => {
    fetch(`${API_URL}/users`).then(async (rsp) => {
      if (rsp.ok) {
        console.log(rsp, "rsp");
        setUsers(await rsp.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};
