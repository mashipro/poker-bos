import React, { DragEvent, FC, useEffect, useRef, useState } from "react";
import { CardSetsDecksTypes } from "../utilities/CardDataset";
import "./CardHolder.scss";
import Cards from "./Cards";

type CardHolderPropTypes = {
  playerCards: CardSetsDecksTypes[];
  onPlayerCardChange?: (cards: any) => void;
  isPlayerCard?: boolean;
  hide?: boolean;
  limit?: number;
};

const CardHolder: FC<CardHolderPropTypes> = (props) => {
  const defaultOffset = 16;

  const [offset, setOffset] = useState(0);
  const [cardSize, setCardSize] = useState(0);
  const [playerCards, setPlayerCards] = useState<CardSetsDecksTypes[]>([]);
  const [selectedCard, setSelectedCard] = useState<number>(-1);
  const [targetCard, setTargetCard] = useState<number>(-1);

  const playerHoldRef = useRef<HTMLDivElement>(null);
  const playerCardRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    console.log("card holder updated");
    if (props.playerCards.length < 1) {
      setOffset(0);
      // playerCardRef.current = [];
    }
    if (props.limit) return setPlayerCards([...getLastCard(props.limit)]);

    setPlayerCards([...props.playerCards]);
  }, [props.playerCards]);

  useEffect(() => {
    //responsible to responsively adjust cards offset in decks when there are too many cards on player hold
    if (playerHoldRef.current === null) return;
    if (playerCards.length <= 1) return;
    const width = playerHoldRef.current.clientWidth;

    if (playerCardRef.current === null) return;
    const cardWidth = playerCardRef.current[0].clientWidth;

    const playerDeckTotalWidth =
      (cardWidth - defaultOffset) * (playerCards.length - 1) + cardWidth;

    const deckToCardsOffset = playerDeckTotalWidth - width;
    const newOffset = deckToCardsOffset / (playerCards.length - 1);

    if (deckToCardsOffset > 0) {
      setOffset(newOffset);
    } else {
      setOffset(0);
    }
  }, [playerCards, cardSize, props.playerCards]);

  const onItemDragged = (ev: DragEvent, index: number) => {
    setSelectedCard(index);
    // console.log("dragging", { index });
  };

  const onItemDragOver = (ev: DragEvent, index: number) => {
    ev.preventDefault();
    if (index === targetCard) return;
    setTargetCard(index);
    console.log("dragged over", ev);

    // console.log("dragOver", index);
  };

  const onItemDraggedEnd = () => {
    if (selectedCard >= 0 && targetCard >= 0) {
      const modifiedPlayerCards = moveCard(selectedCard, targetCard);
      setPlayerCards([...modifiedPlayerCards]);
      props.onPlayerCardChange?.(modifiedPlayerCards);
    }
    setSelectedCard(-1);
    setTargetCard(-1);
  };

  const moveCard = (from: number, to: number) => {
    playerCards.splice(to, 0, playerCards.splice(from, 1)[0]);
    return playerCards;
  };

  const getLastCard = (number: number) => {
    return props.playerCards.slice(1).slice(-number);
  };

  return (
    <div className="holder-container" ref={playerHoldRef}>
      {playerCards.map((card, index) => {
        return (
          <div
            key={index}
            className={`holder-card-container ${
              props.isPlayerCard && "hover-enabled"
            }`}
            style={{
              marginLeft: `-${index >= 1 ? (16 + offset) / 16 : 0}rem`,
            }}
          >
            <div
              className={`holder-card ${
                targetCard === index && props.isPlayerCard
                  ? "holder-card-selected"
                  : "holder-card-normal"
              }`}
              ref={(ref) => (playerCardRef.current[index] = ref!)}
              draggable={props.isPlayerCard}
              onDragStart={(ev) => onItemDragged(ev, index)}
              onDragOver={(ev) => onItemDragOver(ev, index)}
              onDragEnd={onItemDraggedEnd}
              onDragLeave={(ev) => {}}
            >
              <Cards
                detail={card}
                onSizeRendered={(v) => cardSize < 1 && setCardSize(v)}
                hide={props.hide}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardHolder;
