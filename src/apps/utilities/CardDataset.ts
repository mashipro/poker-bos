export type CardSetTypes = {
  set: "hearts" | "diamond" | "clovers" | "spade";
  color: "red" | "black";
  char: "♠" | "♣" | "♦" | "♥";
};

export type CardSubRankTypes = "common" | "royal" | "ace" | "joker";

export type RoyalCharTypes = "♚" | "♛" | "♔";

export type CardDeckTypes = {
  ranks: string;
  value: number;
  subRank: CardSubRankTypes;
};

export type CardSetsDecksTypes = {
  sets: CardSetTypes;
  deck: CardDeckTypes;
};

export type CardCommonMapTypes = {
  [key: string]: number[][];
};
export type CardRoyalMapTypes = {
  [key: string]: RoyalCharTypes;
};

export const cardDecks: CardDeckTypes[] = [
  { ranks: "2", value: 5, subRank: "common" },
  { ranks: "3", value: 5, subRank: "common" },
  { ranks: "4", value: 5, subRank: "common" },
  { ranks: "5", value: 5, subRank: "common" },
  { ranks: "6", value: 5, subRank: "common" },
  { ranks: "7", value: 5, subRank: "common" },
  { ranks: "8", value: 5, subRank: "common" },
  { ranks: "9", value: 5, subRank: "common" },
  { ranks: "10", value: 5, subRank: "common" },
  { ranks: "J", value: 10, subRank: "royal" },
  { ranks: "Q", value: 10, subRank: "royal" },
  { ranks: "K", value: 10, subRank: "royal" },
  { ranks: "A", value: 15, subRank: "ace" },
];

export const cardSets: CardSetTypes[] = [
  { set: "diamond", color: "red", char: "♦" },
  { set: "clovers", color: "black", char: "♣" },
  { set: "hearts", color: "red", char: "♥" },
  { set: "spade", color: "black", char: "♠" },
];

export const cardRoyalMap: CardRoyalMapTypes = {
  K: "♚",
  Q: "♛",
  J: "♔",
};

export const cardCommonMap: CardCommonMapTypes = {
  "2": [
    [0, 0, 0],
    [1, 0, 1],
    [0, 0, 0],
  ],
  "3": [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  "4": [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ],
  "5": [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
  ],
  "6": [
    [1, 1, 1],
    [0, 0, 0],
    [1, 1, 1],
  ],
  "7": [
    [1, 1, 1],
    [0, 1, 0, 0, 0],
    [1, 1, 1],
  ],
  "8": [
    [1, 1, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1],
  ],
  "9": [
    [1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1],
  ],
  "10": [
    [1, 1, 1, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1],
  ],
};
