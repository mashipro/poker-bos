import { createBrowserRouter } from "react-router-dom";
import Devs from "../Devs";
import GameDashboard from "../features/game/GameDashboard";
import GameSession from "../features/game/GameSession";
import Dashboard from "../features/main/Dashboard";

const rootRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/game",
    element: <GameDashboard />,
    children: [
      { path: "session", element: <GameSession /> },
      { path: "devs", element: <Devs /> },
    ],
  },
]);

export default rootRoutes;
