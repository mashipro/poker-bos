import React, { useEffect, useRef, useState } from "react";
import CardHolder from "../../components/CardHolder";
import Cards from "../../components/Cards";
import { CardSetsDecksTypes } from "../../utilities/CardDataset";
import {
  getCompleteCardSet,
  shuffleCard,
} from "../../utilities/managers/GameManager";

import "./GameSession.scss";

export default function GameSession() {
  const cardDefaultSize = 100;
  const cardDecks = getCompleteCardSet(2);
  const [currentDecks, setCurrentDecks] = useState(cardDecks);
  const [gameStart, setGameStart] = useState(false);
  const [showDecks, setShowDecks] = useState(false);
  const [playerCard, setPlayerCard] = useState<CardSetsDecksTypes[]>([]);
  const [tableCard, setTableCard] = useState<CardSetsDecksTypes[]>([]);

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
  };

  const drawCardHandler = () => {
    const decks = [...currentDecks];
    const newCard = decks.pop();

    const playerNewCard = [...playerCard];
    playerNewCard.push(newCard!);

    setCurrentDecks(decks);
    setPlayerCard(playerNewCard);
  };

  const drawPlayerCardHandler = () => {
    const decks = [...playerCard];
    decks.pop();

    setPlayerCard(decks);
  };

  const toggleShowDecksHandler = () => {
    setShowDecks(!showDecks);
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
            <button onClick={drawPlayerCardHandler}>Draw Player Card</button>
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
          {/* {showDecks ? (
            currentDecks.map((item, index) => {
              return <Cards detail={item} key={index} />;
            })
          ) : (
            <Cards />
          )} */}
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
            style={{
              display: "flex",
              flexDirection: "column",
              height: cardDefaultSize * 1.4,
              backgroundColor: "cyan",
            }}
          >
            <CardHolder
              playerCards={tableCard}
              isPlayerCard
              onPlayerCardChange={(cards) => setTableCard(cards)}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
