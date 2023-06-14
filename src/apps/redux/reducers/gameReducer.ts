import {
  getCompleteCardSet,
  shuffleCard,
} from "./../../utilities/managers/GameManager";
import { CardSetsDecksTypes } from "./../../utilities/CardDataset";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserTypes from "../../utilities/types/UserTypes";
import DefaultValue from "../../utilities/DefaultValue";
import UserDataset from "../../utilities/dummies/userDataDummies";

type PlayerTypes = {
  uid: string;
  playerDecks: CardSetsDecksTypes[];
  playerCardWell: CardSetsDecksTypes[];
};

type GameLogTypes = {
  time: Date;
  statCode: number;
  message: string;
  user: PlayerTypes;
};

type DefaultGameReducerTypes = {
  value: number;
  cardDecks: CardSetsDecksTypes[];
  tableDecks: CardSetsDecksTypes[];
  player: PlayerTypes[];
  isStart: boolean;
  turns: string | null;
  turnsCount: number;
  isClockwise: boolean;
  sessionID: string;
  gameLog: GameLogTypes[];
};

type CardModifyTypes = {
  player: UserTypes;
  decks: CardSetsDecksTypes[];
};

type CardActionTypes = {
  player: UserTypes;
  card: CardSetsDecksTypes;
  index: number;
};

const DefaultPlayer: PlayerTypes = {
  uid: "",
  playerDecks: [],
  playerCardWell: [],
};

const InitialState: DefaultGameReducerTypes = {
  value: 0,
  cardDecks: [],
  tableDecks: [],
  player: [],
  isStart: false,
  turns: null,
  turnsCount: 0,
  isClockwise: true,
  sessionID: "default",
  gameLog: [],
};

//todo: add Game Logger

const getPlayerIndex = (
  state: DefaultGameReducerTypes,
  targetPlayer: UserTypes
) => {
  const playerIndex = state.player.findIndex(
    (player) => player.uid === targetPlayer.uid
  );
  return playerIndex;
};

export const gameReducer = createSlice({
  name: "gameSession",
  initialState: InitialState,
  reducers: {
    joinSession: (state, action: PayloadAction<UserTypes>) => {
      const newPlayer: PlayerTypes = {
        ...DefaultPlayer,
        uid: action.payload.uid,
      };

      //for dev automatically join other player except current user
      const playerList = UserDataset;
      let otherPlayer: PlayerTypes[] = [];
      playerList.forEach((user) => {
        if (action.payload.uid === user.uid) return;
        const newPlayer: PlayerTypes = {
          ...DefaultPlayer,
          uid: user.uid,
        };
        otherPlayer.push(newPlayer);
      });

      if (state.player?.length > DefaultValue.MAX_PLAYER) return { ...state };
      return { ...state, player: [...state.player, newPlayer, ...otherPlayer] };
    },

    endSession: () => {
      return { ...InitialState };
    },

    startGameSession: (state) => {
      const newCards = getCompleteCardSet(2);
      const shuffled = shuffleCard(newCards);
      console.log("starting game session");

      return { ...state, cardDecks: [...shuffled], isStart: true };
    },

    resetGameSession: () => {
      return { ...InitialState };
    },

    playerDrawCard: (state, action: PayloadAction<UserTypes>) => {
      const lastCardDeck = [...state.cardDecks];
      const pickLast = lastCardDeck.pop();
      const playerIndex = getPlayerIndex(state, action.payload);

      state.cardDecks = lastCardDeck;
      state.player[playerIndex].playerDecks.push(pickLast!);
    },

    changePlayerCardDecks: (state, action: PayloadAction<CardModifyTypes>) => {
      const playerIndex = getPlayerIndex(state, action.payload.player);

      state.player[playerIndex].playerDecks = action.payload.decks;
    },

    changePlayerCardWell: (state, action: PayloadAction<CardModifyTypes>) => {
      const playerIndex = getPlayerIndex(state, action.payload.player);

      state.player[playerIndex].playerCardWell = action.payload.decks;
    },

    moveCardToTableDecks: (state, action: PayloadAction<CardActionTypes>) => {
      const playerIndex = getPlayerIndex(state, action.payload.player);
      const playerDeck = state.player[playerIndex].playerDecks;

      playerDeck.splice(action.payload.index, 1);
      state.tableDecks.push(action.payload.card);
    },

    moveCardToWell: (state, action: PayloadAction<CardActionTypes>) => {
      const playerIndex = getPlayerIndex(state, action.payload.player);
      const player = state.player[playerIndex];

      player.playerDecks.splice(action.payload.index, 1);
      player.playerCardWell.push(action.payload.card);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  joinSession,
  endSession,
  startGameSession,
  resetGameSession,
  playerDrawCard,
  changePlayerCardDecks,
  moveCardToTableDecks,
  moveCardToWell,
  changePlayerCardWell,
} = gameReducer.actions;

export default gameReducer.reducer;
