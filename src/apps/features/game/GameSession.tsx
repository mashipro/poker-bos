import { Button } from "@mui/material";
import React, { DragEvent, useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardHolder from "../../components/CardHolder";
import { RootStateTypes } from "../../redux/reducers";
import {
  joinSession,
  playerDrawCard,
  resetGameSession,
  startGameSession,
} from "../../redux/reducers/gameReducer";
import { CardSetsDecksTypes } from "../../utilities/CardDataset";
import DefaultValue from "../../utilities/DefaultValue";
import {
  getCompleteCardSet,
  shuffleCard,
} from "../../utilities/managers/GameManager";

import "./GameSession.scss";

export default function GameSession() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gameState = useSelector((state: RootStateTypes) => state.game);
  const userState = useSelector((state: RootStateTypes) => state.user);

  const cardDefaultSize = 100;
  const cardDecks = getCompleteCardSet(2);

  const [currentDecks, setCurrentDecks] = useState(cardDecks);
  const [gameStart, setGameStart] = useState(false);
  const [showDecks, setShowDecks] = useState(false);
  const [playerCard, setPlayerCard] = useState<CardSetsDecksTypes[]>([]);
  const [tableCard, setTableCard] = useState<CardSetsDecksTypes[]>([]);
  const [targetTable, setTargetTable] = useState(false);

  const playerList = useMemo(() => gameState.player, [gameState]);
  const currentPlayerUID = userState.uid;

  const shuffleHandler = () => {
    console.log("shuffling...");
    setCurrentDecks([...shuffleCard(currentDecks)]);
  };

  const joinGamePressHandler = () => {
    dispatch(joinSession(userState));
  };

  const startPlayHandler = () => {
    // setGameStart(true);
    dispatch(startGameSession());
  };

  const resetPlayHandler = () => {
    dispatch(resetGameSession());
    // setCurrentDecks(cardDecks);
    // setGameStart(false);
    // setPlayerCard([]);
    // setTableCard([]);
  };

  const drawCardHandler = () => {
    dispatch(playerDrawCard(userState));
    // const decks = [...currentDecks];
    // const newCard = decks.pop();

    // const playerNewCard = [...playerCard];
    // playerNewCard.push(newCard!);

    // setCurrentDecks(decks);
    // setPlayerCard(playerNewCard);
  };

  const toggleShowDecksHandler = () => {
    setShowDecks(!showDecks);
  };

  const onDragOverHandler = (ev: DragEvent) => {
    ev.preventDefault();
    setTargetTable(true);
    // console.log(ev.target);
  };

  const onPlayerDragItemEndHandler = (
    card: CardSetsDecksTypes,
    index: number
  ) => {
    if (!targetTable) return;
    const newCardList = [...playerCard];
    newCardList.splice(index, 1);
    setTableCard([...tableCard, card]);
    setPlayerCard(newCardList);
    setTargetTable(false);
  };

  const onDragLeaveHandler = () => {
    setTargetTable(false);
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
              <Button variant="contained" onClick={shuffleHandler}>
                Shuffle Decks
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
            onDragOver={onDragOverHandler}
            onDragLeave={onDragLeaveHandler}
          >
            <CardHolder
              playerCards={tableCard}
              isPlayerCard
              onPlayerCardChange={(cards) => setTableCard(cards)}
              disableHighlight
              limit={4}
            />
          </div>
        </div>
        {gameState.player.map((playerState, index) => {
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
                  isPlayerCard={playerState.uid === userState.uid}
                  onPlayerCardChange={(cards) => setPlayerCard(cards)}
                  isDragTargetTable={targetTable}
                  onDragEnd={onPlayerDragItemEndHandler}
                />
              </div>
            </div>
          );
        })}
        {/* <div>
          Player 1 Card
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: cardDefaultSize * 1.4,
              backgroundColor: "cyan",
            }}
          >
            <CardHolder
              playerCards={playerCard}
              isPlayerCard
              onPlayerCardChange={(cards) => setPlayerCard(cards)}
              isDragTargetTable={targetTable}
              onDragEnd={onPlayerDragItemEndHandler}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
