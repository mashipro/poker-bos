import { Button } from "@mui/material";
import React, { DragEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardHolder from "../../components/CardHolder";

import { CardSetsDecksTypes } from "../../utilities/CardDataset";
import {
  getCompleteCardSet,
  shuffleCard,
} from "../../utilities/managers/GameManager";

import "./GameSession.scss";

export default function GameSession() {
  const navigate = useNavigate();
  const cardDefaultSize = 100;
  const cardDecks = getCompleteCardSet(2);
  const [currentDecks, setCurrentDecks] = useState(cardDecks);
  const [gameStart, setGameStart] = useState(false);
  const [showDecks, setShowDecks] = useState(false);
  const [playerCard, setPlayerCard] = useState<CardSetsDecksTypes[]>([]);
  const [tableCard, setTableCard] = useState<CardSetsDecksTypes[]>([]);
  const [targetTable, setTargetTable] = useState(false);

  const shuffleHandler = () => {
    console.log("shuffling...");
    setCurrentDecks([...shuffleCard(currentDecks)]);
  };

  const startPlayHandler = () => {
    setGameStart(true);
  };

  const resetPlayHandler = () => {
    setCurrentDecks(cardDecks);
    setGameStart(false);
    setPlayerCard([]);
    setTableCard([]);
  };

  const drawCardHandler = () => {
    const decks = [...currentDecks];
    const newCard = decks.pop();

    const playerNewCard = [...playerCard];
    playerNewCard.push(newCard!);

    setCurrentDecks(decks);
    setPlayerCard(playerNewCard);
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
      <div>
        <button onClick={toggleShowDecksHandler}>
          {showDecks ? "hide" : "show"} decks
        </button>
        {gameStart ? (
          <div>
            <button onClick={resetPlayHandler}>Reset</button>
            <button onClick={drawCardHandler}>Draw</button>
          </div>
        ) : (
          <div>
            <button onClick={startPlayHandler}>Start</button>
            <button onClick={shuffleHandler}>Shuffle Decks</button>
          </div>
        )}
      </div>
      <div className="game-base-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 20px 0 20px",
            margin: "20px",
          }}
        >
          <CardHolder playerCards={currentDecks} hide={!showDecks} limit={5} />
        </div>
        {currentDecks.length}
        Cards in deck
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
        <div>
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
        </div>
      </div>
    </div>
  );
}
