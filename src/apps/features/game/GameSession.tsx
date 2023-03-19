import React, { useCallback, useEffect, useRef, useState } from "react";
import CardHolder from "../../components/CardHolder";
import Cards from "../../components/Cards";
import { CardSetsDecksTypes } from "../../utilities/CardDataset";
import {
  getCompleteCardSet,
  shuffleCard,
} from "../../utilities/managers/GameManager";

import "./GameSession.scss";

export default function GameSession() {
  const cardDecks = getCompleteCardSet(2);
  const [currentDecks, setCurrentDecks] = useState(cardDecks);
  const [gameStart, setGameStart] = useState(false);
  const [showDecks, setShowDecks] = useState(false);
  const [playerCard, setPlayerCard] = useState<CardSetsDecksTypes[]>([]);
  const [cardSize, setCardSize] = useState(0);
  const [offset, setOffset] = useState(0);

  const playerHoldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playerHoldRef.current === null) return;
    if (playerCard.length <= 1) return;
    const width = playerHoldRef.current.clientWidth;
    const scrollWidth = playerHoldRef.current.scrollWidth;
    const scrollOffset = scrollWidth - width;
    const newOffset = offset + scrollOffset / (playerCard.length - 1);

    if (scrollOffset === 0) {
      setOffset(offset - offset / playerCard.length);
      return;
    }
    setOffset(newOffset);
  }, [playerHoldRef, playerCard, cardSize]);

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
    setOffset(0);
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          {showDecks ? (
            currentDecks.map((item, index) => {
              return <Cards detail={item} key={index} />;
            })
          ) : (
            <Cards />
          )}
        </div>
        {currentDecks.length}
        <div className="player-container" ref={playerHoldRef}>
          {playerCard.map((card, index) => {
            return (
              <div
                key={index}
                className="player-card-container"
                style={{
                  marginLeft: `-${index >= 1 ? (16 + offset) / 16 : 0}rem`,
                }}
              >
                <div className="player-card" draggable>
                  <Cards
                    detail={card}
                    onSizeRendered={(v) => cardSize < 1 && setCardSize(v)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        Components
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CardHolder playerCards={playerCard} />
        </div>
      </div>
    </div>
  );
}
