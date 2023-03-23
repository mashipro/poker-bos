import { Button, Dialog } from "@mui/material";
import { padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserDataset from "../../utilities/dummies/userDataDummies";
import UserTypes from "../../utilities/types/UserTypes";
import { signIn, signOut } from "../../redux/reducers/userReducer";
import { RootStateTypes } from "../../redux/reducers";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootStateTypes) => state.user);

  const userList = UserDataset;

  const [openModal, setOpenModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const goToGameHandler = () => {
    navigate("/game");
  };

  const loginHandler = () => {
    setOpenModal(!openModal);
  };

  const logoutHandler = () => {
    dispatch(signOut());
  };

  const loginCloseHandler = () => {
    setOpenModal(false);
  };

  const onUserSelected = (user: UserTypes) => {
    dispatch(signIn(user));
    setOpenModal(false);
  };

  useEffect(() => {
    setLoggedIn(user.uid.length > 0);
  }, [user]);

  return (
    <div>
      POKER
      <div>
        {loggedIn ? (
          <div>
            <Button variant="outlined" onClick={logoutHandler}>
              Logout
            </Button>
            <Button variant="outlined" onClick={goToGameHandler}>
              JoinGame
            </Button>
          </div>
        ) : (
          <Button variant="outlined" onClick={loginHandler}>
            Login
          </Button>
        )}
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
              <div key={user.uid}>
                <Button
                  variant="contained"
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
