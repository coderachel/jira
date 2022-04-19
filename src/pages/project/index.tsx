import { KanbanScreen } from "pages/kanban";
import { EpicScreen } from "pages/epic";
import { Navigate, Route, Routes } from "react-router";
import { Link } from "react-router-dom";
export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务</Link>
      <Routes>
        <Route
          path="/projects/:personId"
          element={<Navigate to={"/kanban"} />}
        ></Route>
        <Route path="/kanban" element={<KanbanScreen />}></Route>
        <Route path="/epic" element={<EpicScreen />}></Route>
      </Routes>
    </div>
  );
};
