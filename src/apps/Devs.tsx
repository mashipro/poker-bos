import React, { useState } from "react";
import Cards from "./components/Cards";
import {
  getCompleteCardSet,
  shuffleCard,
} from "./utilities/managers/GameManager";

export default function Devs() {
  const decks = getCompleteCardSet(2);

  const [currentDecks, setCurrentDecks] = useState(decks);

  const shuffleHandler = () => {
    console.log("shuffling...");
    setCurrentDecks([...shuffleCard(currentDecks)]);
  };

  return (
    <div>
      <button onClick={shuffleHandler}>SHUFFLE</button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {currentDecks.map((item, index) => {
          return <Cards detail={item} key={index} />;
        })}
      </div>
    </div>
  );
}
