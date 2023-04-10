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

type DefaultReducerTypes = {
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

const DefaultPlayer: PlayerTypes = {
  uid: "",
  playerDecks: [],
  playerCardWell: [],
};

const InitialState: DefaultReducerTypes = {
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

    endSession: (state) => {
      return { ...InitialState };
    },

    startGameSession: (state) => {
      const newCards = getCompleteCardSet(2);
      const shuffled = shuffleCard(newCards);
      console.log("starting game session");

      return { ...state, cardDecks: [...shuffled], isStart: true };
    },

    resetGameSession: (state) => {
      return { ...InitialState };
    },

    playerDrawCard: (state, action: PayloadAction<UserTypes>) => {
      const lastCardDeck = [...state.cardDecks];
      const pickLast = lastCardDeck.pop();
      const playerIndex = state.player.findIndex(
        (player) => player.uid === action.payload.uid
      );

      state.cardDecks = lastCardDeck;
      state.player[playerIndex].playerDecks.push(pickLast!);
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
} = gameReducer.actions;

export default gameReducer.reducer;
