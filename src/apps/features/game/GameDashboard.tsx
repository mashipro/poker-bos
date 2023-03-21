import Button from "@mui/material/Button";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function GameDashboard() {
  const navigate = useNavigate();

  const onBackPressHandler = () => {
    navigate(-1);
  };

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
        <Button variant="contained" onClick={onBackPressHandler}>
          HOME
        </Button>
        <Button variant="outlined" onClick={goToGameHandler}>
          Go to Game Session
        </Button>
        <Button variant="outlined" onClick={goToDevsHandler}>
          Go to Devs Session
        </Button>
      </div>
      <Outlet />
    </div>
  );
}
