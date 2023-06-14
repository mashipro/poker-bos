import { Button } from "@mui/material";
import React, { DragEvent, useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardHolder from "../../components/CardHolder";
import { RootStateTypes } from "../../redux/reducers";
import {
  changePlayerCardDecks,
  changePlayerCardWell,
  joinSession,
  moveCardToTableDecks,
  moveCardToWell,
  playerDrawCard,
  resetGameSession,
  startGameSession,
} from "../../redux/reducers/gameReducer";
import { CardSetsDecksTypes } from "../../utilities/CardDataset";
import DefaultValue from "../../utilities/DefaultValue";
import UserTypes from "../../utilities/types/UserTypes";

import "./GameSession.scss";

export default function GameSession() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gameState = useSelector((state: RootStateTypes) => state.game);
  const userState = useSelector((state: RootStateTypes) => state.user);

  const cardDefaultSize = 100;

  const [showDecks, setShowDecks] = useState(false);
  const [targetTable, setTargetTable] = useState(false);
  const [targetWell, setTargetWell] = useState(false);
  const [cardDragged, setCardDragged] = useState(false);

  const playerList = useMemo(() => gameState.player, [gameState]);

  const joinGamePressHandler = () => {
    dispatch(joinSession(userState));
  };

  const startPlayHandler = () => {
    dispatch(startGameSession());
  };

  const resetPlayHandler = () => {
    dispatch(resetGameSession());
  };

  const drawCardHandler = () => {
    dispatch(playerDrawCard(userState));
  };

  const onPlayerCardChangeHandler = (
    player: UserTypes,
    playerCardHold: CardSetsDecksTypes[]
  ) => {
    console.log("card hold changed");
    dispatch(changePlayerCardDecks({ player: player, decks: playerCardHold }));
  };

  const onPlayerWellChangeHandler = (playerCardHold: CardSetsDecksTypes[]) => {
    console.log("card well changed");
    dispatch(
      changePlayerCardWell({ player: userState, decks: playerCardHold })
    );
  };

  const toggleShowDecksHandler = () => {
    setShowDecks(!showDecks);
  };

  const onDragOverTableHandler = (ev: DragEvent) => {
    ev.preventDefault();
    if (cardDragged) {
      setTargetTable(true);
    }
    // console.log(ev.target);
  };

  const onDragLeaveTableHandler = () => {
    setTargetTable(false);
  };

  const onDragOverWellHandler = (ev: DragEvent) => {
    ev.preventDefault();
    if (cardDragged) {
      setTargetWell(true);
    }
    // console.log(ev.target);
  };

  const onDragLeaveWellHandler = () => {
    setTargetWell(false);
  };

  const onPlayerDragCardHandler = () => {
    setCardDragged(true);
  };

  const onPlayerDragCardEndHandler = (
    card: CardSetsDecksTypes,
    index: number
  ) => {
    if (targetTable) {
      dispatch(moveCardToTableDecks({ player: userState, card, index }));
    }

    if (targetWell) {
      dispatch(moveCardToWell({ player: userState, card, index }));
    }

    setTargetTable(false);
    setTargetWell(false);
    setCardDragged(false);
  };

  const currentPlayerCardWell = () => {
    const playerIndex = playerList.findIndex(
      (player) => player.uid === userState.uid
    );
    return playerList[playerIndex]?.playerCardWell ?? [];
  };

  return (
    <div>
      <h1>Game Session</h1>
      {playerList.length < DefaultValue.MAX_PLAYER ? (
        <Button variant="contained" onClick={joinGamePressHandler}>
          Join Game
        </Button>
      ) : (
        <div>
          <Button onClick={toggleShowDecksHandler}>
            {showDecks ? "hide" : "show"} decks
          </Button>
          {gameState.isStart ? (
            <div>
              <Button variant="contained" onClick={resetPlayHandler}>
                Reset
              </Button>
              <Button variant="contained" onClick={drawCardHandler}>
                Draw
              </Button>
            </div>
          ) : (
            <div>
              <Button variant="contained" onClick={startPlayHandler}>
                Start
              </Button>
            </div>
          )}
        </div>
      )}
      <div className="game-base-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 20px 0 20px",
            margin: "20px",
          }}
        >
          <CardHolder
            playerCards={gameState.cardDecks}
            hide={!showDecks}
            limit={5}
          />
        </div>
        <div
          style={{
            marginBottom: 40,
          }}
        >
          Table Card
          <div
            className={`${targetTable && "focused"}`}
            style={{
              display: "flex",
              flexDirection: "column",
              height: cardDefaultSize * 1.4,
              backgroundColor: "burlywood",
            }}
            onDragOver={onDragOverTableHandler}
            onDragLeave={onDragLeaveTableHandler}
          >
            <CardHolder
              playerCards={gameState.tableDecks}
              showCard
              // onPlayerCardChange={(cards) => setTableCard(cards)}
              disableHighlight
              disableSwap
            />
          </div>
        </div>
        <div
          style={{
            marginBottom: 40,
          }}
        >
          Card Well
          <div
            className={`${targetWell && "focused"}`}
            style={{
              display: "flex",
              flexDirection: "column",
              height: cardDefaultSize * 1.4,
              backgroundColor: "skyblue",
            }}
            onDragOver={onDragOverWellHandler}
            onDragLeave={onDragLeaveWellHandler}
          >
            <CardHolder
              playerCards={currentPlayerCardWell()}
              showCard
              onPlayerCardChange={onPlayerWellChangeHandler}
              // onDragEnd={onPlayerDragCardEndHandler}
            />
          </div>
        </div>

        {gameState.player.map((playerState, index) => {
          const isCurrentPlayer = playerState.uid === userState.uid;
          return (
            <div>
              player-{index + 1} - {playerState.uid}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: cardDefaultSize * 1.4,
                  backgroundColor: "cyan",
                }}
              >
                <CardHolder
                  playerCards={playerState.playerDecks}
                  showCard={isCurrentPlayer}
                  disableSwap={!isCurrentPlayer}
                  onPlayerCardChange={(cards) =>
                    onPlayerCardChangeHandler(userState, cards)
                  }
                  onDrag={onPlayerDragCardHandler}
                  onDragEnd={onPlayerDragCardEndHandler}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
