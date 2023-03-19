import { cardDecks, cardSets, CardSetsDecksTypes } from "../CardDataset";

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

export default manager;
