import React, { DragEvent, FC, useEffect, useRef, useState } from "react";
import { CardSetsDecksTypes } from "../utilities/CardDataset";
import "./CardHolder.scss";
import Cards from "./Cards";

type CardHolderPropTypes = {
  playerCards: CardSetsDecksTypes[];
};

const CardHolder: FC<CardHolderPropTypes> = (props) => {
  const playerHoldRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [cardSize, setCardSize] = useState(0);

  useEffect(() => {
    if (playerHoldRef.current === null) return;
    if (props.playerCards.length <= 1) return;
    const width = playerHoldRef.current.clientWidth;
    const scrollWidth = playerHoldRef.current.scrollWidth;
    const scrollOffset = scrollWidth - width;
    const newOffset = offset + scrollOffset / (props.playerCards.length - 1);

    if (scrollOffset === 0) {
      setOffset(offset - offset / props.playerCards.length);
      return;
    }
    setOffset(newOffset);
  }, [playerHoldRef, props.playerCards, cardSize]);

  const onItemDragged = (ev: DragEvent, index: number) => {
    console.log("dragging", index);
  };

  const onItemDragOver = (ev: DragEvent, index: number) => {
    console.log("dragOver", index);
  };

  return (
    <div className="holder-container" ref={playerHoldRef}>
      {props.playerCards.map((card, index) => {
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
              onDrag={(ev) => onItemDragged(ev, index)}
              onDragOver={(ev) => onItemDragOver(ev, index)}
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
