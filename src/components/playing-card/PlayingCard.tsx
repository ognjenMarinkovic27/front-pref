import React from "react";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import "./PlayingCard.css";
import Card, { CardSuit, CardValue } from "../../types/card";

interface PlayingCardProps {
  card: Card;
  onClick?: (card: Card) => void;
}

const suitMapping: { [key in CardSuit]: string } = {
  2: "❤️", // Heart icon
  1: "♦️", // Diamond icon
  3: "♣️", // Club icon
  0: "♠️", // Spade icon
};

const valueMapping: { [key in CardValue]: string } = {
  7: "7",
  8: "8",
  9: "9",
  10: "T",
  11: "J",
  12: "Q",
  13: "K",
  14: "A",
};

const PlayingCard: React.FC<PlayingCardProps> = ({ card, onClick }) => {
  function handleClick() {
    if (onClick) {
      onClick(card);
    }
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          onClick={handleClick}
          className={`playing-card ${onClick != undefined ? "clickable-card" : ""}`}
        >
          <h3 className="card-rank-left">{valueMapping[card.value]}</h3>
          <h3 className="card-rank-right">{valueMapping[card.value]}</h3>
          <h3 className="card-suit">{suitMapping[card.suit]}</h3>
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};

export default PlayingCard;
