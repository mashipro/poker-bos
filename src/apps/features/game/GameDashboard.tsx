import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function GameDashboard() {
  const navigate = useNavigate();
  const goToGameHandler = () => {
    navigate("/game/session");
  };
  const goToDevsHandler = () => {
    navigate("/game/devs");
  };
  return (
    <div>
      POKER GAME
      <div>
        <button onClick={goToGameHandler}> Go to Game Session</button>
        <button onClick={goToDevsHandler}> Go to Devs Session</button>
      </div>
      <Outlet />
    </div>
  );
}
