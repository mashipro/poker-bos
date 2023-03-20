import React, { DragEvent, FC, useEffect, useRef, useState } from "react";
import { CardSetsDecksTypes } from "../utilities/CardDataset";
import "./CardHolder.scss";
import Cards from "./Cards";

type CardHolderPropTypes = {
  playerCards: CardSetsDecksTypes[];
  onPlayerCardChange?: (index: number) => void;
};

const CardHolder: FC<CardHolderPropTypes> = (props) => {
  const [offset, setOffset] = useState(0);
  const [cardSize, setCardSize] = useState(0);
  const [playerCards, setPlayerCards] = useState([...props.playerCards]);
  const [selectedCard, setSelectedCard] = useState<number>(-1);
  const [targetCard, setTargetCard] = useState<number>(-1);

  const playerHoldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlayerCards([...props.playerCards]);
  }, [props.playerCards]);

  useEffect(() => {
    if (playerHoldRef.current === null) return;
    if (playerCards.length <= 1) return;
    const width = playerHoldRef.current.clientWidth;
    const scrollWidth = playerHoldRef.current.scrollWidth;
    const scrollOffset = scrollWidth - width;
    const newOffset = offset + scrollOffset / (props.playerCards.length - 1);

    if (scrollOffset === 0) {
      setOffset(offset - offset / props.playerCards.length);
      return;
    }
    setOffset(newOffset);
  }, [playerHoldRef, playerCards, cardSize]);

  const onItemDragged = (ev: DragEvent, index: number) => {
    setSelectedCard(index);
    console.log("dragging", { index });
  };

  const onItemDragOver = (ev: DragEvent, index: number) => {
    ev.preventDefault();
    if (index === targetCard) return;
    setTargetCard(index);

    console.log("dragOver", index);
  };

  const onItemDraggedEnd = () => {
    if (selectedCard >= 0 && targetCard >= 0) {
      const modifiedPlayerCards = moveCard(
        selectedCard,
        targetCard,
        playerCards
      );
      setPlayerCards([...modifiedPlayerCards]);
    }
    setSelectedCard(-1);
    setTargetCard(-1);
  };

  const moveCard = (from: number, to: number, array: CardSetsDecksTypes[]) => {
    playerCards.splice(to + 1, 0, playerCards.splice(from, 1)[0]);
    return playerCards;
  };

  return (
    <div className="holder-container" ref={playerHoldRef}>
      {playerCards.map((card, index) => {
        return (
          <div
            key={index}
            className="holder-card-container"
            style={{
              marginLeft: `-${index >= 1 ? (16 + offset) / 16 : 0}rem`,
            }}
          >
            <div
              className="holder-card"
              draggable
              onDragStart={(ev) => onItemDragged(ev, index)}
              onDragOver={(ev) => onItemDragOver(ev, index)}
              onDragEnd={onItemDraggedEnd}
            >
              <Cards
                detail={card}
                onSizeRendered={(v) => cardSize < 1 && setCardSize(v)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardHolder;
