import React, { FC } from "react";
import {
  cardCommonMap,
  CardCommonMapTypes,
  CardSetsDecksTypes,
  CardSetTypes,
  CardSubRankTypes,
  cardRoyalMap,
} from "../utilities/CardDataset";
import "./Cards.scss";

type CardPropTypes = {
  detail?: CardSetsDecksTypes;
  size?: number;
  hide?: boolean;
  showRoyalSymbol?: boolean;
  onSizeRendered?: (size: number) => void;
};

type CardHeadPropTypes = {
  size: number;
  ranks: string;
  invert?: boolean;
  sets: CardSetTypes;
};

type CardContentPropTypes = {
  cardSet: CardSetTypes;
  subRank: CardSubRankTypes;
  ranks: string;
  showRoyalSymbol?: boolean;
};

const CardHead: FC<CardHeadPropTypes> = (props) => {
  return (
    <div
      className={`card-title ${props.invert && "invert"}`}
      style={{
        color: props.sets.color,
        fontSize: props.size,
      }}
    >
      <div>{props.ranks}</div>
      {props.sets.char}
    </div>
  );
};

const CardContent: FC<CardContentPropTypes> = (props) => {
  switch (props.subRank) {
    case "common":
      const commonMapper =
        cardCommonMap[props.ranks as keyof CardCommonMapTypes];
      return (
        <>
          {commonMapper &&
            commonMapper.map((item, ix) => {
              return (
                <div key={ix} className="card-spots-section">
                  {item.map((spot, iy) => {
                    return (
                      <div
                        key={iy}
                        className="card-spots"
                        style={{
                          color: spot === 1 ? props.cardSet.color : "white",
                        }}
                      >
                        {props.cardSet.char}
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </>
      );

    case "royal":
      return (
        <div
          className="card-ace-container"
          style={{ color: props.cardSet.color }}
        >
          {props.showRoyalSymbol
            ? cardRoyalMap[props.ranks]
            : props.cardSet.char}
        </div>
      );

    case "ace":
      return (
        <div
          className="card-ace-container"
          style={{ color: props.cardSet.color }}
        >
          {props.cardSet.char}
        </div>
      );

    default:
      return <></>;
  }
};

const Cards: FC<CardPropTypes> = (props) => {
  const cardSize = props.size ?? 100;
  const cardDetail = props.detail?.deck;
  const cardSet = props.detail?.sets;

  const height = cardSize * 1.4;
  const width = cardSize;

  props.onSizeRendered?.(cardSize);

  return (
    <div className="card" style={{ width, height }}>
      {cardDetail && cardSet && !props.hide ? (
        <>
          <CardHead
            sets={cardSet}
            ranks={cardDetail.ranks}
            size={cardSize / 8}
          />
          <div className="card-spots-container">
            <CardContent
              cardSet={cardSet}
              ranks={cardDetail.ranks}
              subRank={cardDetail.subRank}
              showRoyalSymbol={props.showRoyalSymbol}
            />
          </div>
          <CardHead
            sets={cardSet}
            ranks={cardDetail.ranks}
            size={cardSize / 8}
            invert
          />
        </>
      ) : (
        <div className="card-empty"></div>
      )}
    </div>
  );
};

export default Cards;
