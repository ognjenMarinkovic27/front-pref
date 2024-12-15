import React from 'react';
import {
  HoverCard,
  HoverCardTrigger,
} from '@radix-ui/react-hover-card';
import './PlayingCard.css'

interface PlayingCardProps {
  rank: string;
  suit: string;
}

const suitMapping: { [key: string]: string } = {
  hearts: "❤️",  // Heart icon
  diamonds: "♦️", // Diamond icon
  clubs: "♣️",    // Club icon
  spades: "♠️",   // Spade icon
};

const PlayingCard: React.FC<PlayingCardProps> = ({ rank, suit }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="playing-card">
          <h3 className="card-rank-left">{rank}</h3>
          <h3 className="card-rank-right">{rank}</h3>
          <h3 className="card-suit">{suitMapping[suit]}</h3>
        </div>
      </HoverCardTrigger>
    </HoverCard>
  );
};

export default PlayingCard;