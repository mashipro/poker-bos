import { Button, Dialog } from "@mui/material";
import { padding } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDataset from "../../utilities/dummies/userDataDummies";
import UserTypes from "../../utilities/types/UserTypes";

export default function Dashboard() {
  const navigate = useNavigate();

  const userList = UserDataset;

  const [openModal, setOpenModal] = useState(false);

  const goToGameHandler = () => {
    navigate("/game");
  };

  const loginHandler = () => {
    setOpenModal(!openModal);
  };

  const loginCloseHandler = () => {
    setOpenModal(false);
  };

  const onUserSelected = (user: UserTypes) => {};

  return (
    <div>
      POKER
      <div>
        <Button variant="outlined" onClick={loginHandler}>
          Login
        </Button>
        {/* <Button variant="contained" onClick={goToGameHandler}>
          Go to Game
        </Button> */}
        <Dialog open={openModal} onClose={loginCloseHandler}>
          <div
            style={{
              backgroundColor: "skyblue",
              padding: 40,
              borderRadius: 10,
            }}
          >
            Select user
            {userList.map((user) => (
              <div>
                <Button
                  variant="contained"
                  key={user.uid}
                  onClick={() => onUserSelected(user)}
                >
                  {user.name}
                </Button>
              </div>
            ))}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
