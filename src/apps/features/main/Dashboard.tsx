import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const goToGameHandler = () => {
    navigate("/game");
  };
  return (
    <div>
      POKER
      <div>
        <button onClick={goToGameHandler}> Go to Game</button>
      </div>
    </div>
  );
}
