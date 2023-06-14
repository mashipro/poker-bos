import { cardDecks, cardSets, CardSetsDecksTypes } from "../CardDataset";

type GameManagerVerifyReturnTypes = {
  isAllowed: boolean;
  message: string;
};

const manager = () => {};

export const getCompleteCardSet = (sets?: number) => {
  let cardSetDeck: CardSetsDecksTypes[] = [];
  cardSets.forEach((sets) => {
    cardDecks.forEach((deck) => {
      cardSetDeck.push({ sets, deck });
    });
  });

  let multipliedCardSetDeck: CardSetsDecksTypes[] = [];
  if (sets && sets > 1) {
    for (let i = 0; i < sets; i++) {
      multipliedCardSetDeck.push(...cardSetDeck);
    }
    return multipliedCardSetDeck;
  }
  return cardSetDeck;
};

export const shuffleCard = (cardDecks: CardSetsDecksTypes[]) => {
  let currentIndex = cardDecks.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [cardDecks[currentIndex], cardDecks[randomIndex]] = [
      cardDecks[randomIndex],
      cardDecks[currentIndex],
    ];
  }

  return cardDecks;
};

const findCardIndexInDataset = (card: CardSetsDecksTypes) => {
  const cardIndex = cardDecks.findIndex(
    (cardDeck) => cardDeck.ranks === card.deck.ranks
  );
  return cardIndex;
};

export const verifyGameRules = (
  cardDecks: CardSetsDecksTypes[]
): GameManagerVerifyReturnTypes => {
  if (cardDecks.length <= 2)
    return { isAllowed: true, message: "insufficient card" };
  for (let cardIndex = 1; cardIndex < cardDecks.length; cardIndex++) {
    const card = cardDecks[cardIndex];
    const previousCard = cardDecks[cardIndex - 1];
    if (
      //Check if both sub-rank is not the same
      card.deck.subRank !== previousCard.deck.subRank ||
      previousCard.deck.subRank !== "joker"
    ) {
      return { isAllowed: false, message: "card not in sequence" };
    }
    if (card.sets.set !== previousCard.sets.set) {
      //Check if both set is not the same
      return { isAllowed: false, message: "card not in the same set" };
    }
    if (card.deck.ranks === previousCard.deck.ranks) {
      //Check if both ranks the same
      return { isAllowed: false, message: "duplicate card" };
    }
    if (
      findCardIndexInDataset(card) + 1 !==
        findCardIndexInDataset(previousCard) ||
      findCardIndexInDataset(card) - 1 !== findCardIndexInDataset(previousCard)
    ) {
      //Check if both not in series
      return { isAllowed: false, message: "card not in serial ranks" };
    }
  }
  return { isAllowed: true, message: "allowed card sequence" };
};

export default manager;
