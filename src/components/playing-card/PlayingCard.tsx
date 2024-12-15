import React from "react";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import "./PlayingCard.css";
import { CardSuit, CardValue } from "../../types/card";

interface PlayingCardProps {
  value: CardValue;
  suit: CardSuit;
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

const PlayingCard: React.FC<PlayingCardProps> = ({ value, suit }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="playing-card">
          <h3 className="card-rank-left">{valueMapping[value]}</h3>
          <h3 className="card-rank-right">{valueMapping[value]}</h3>
          <h3 className="card-suit">{suitMapping[suit]}</h3>
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};

export default PlayingCard;
