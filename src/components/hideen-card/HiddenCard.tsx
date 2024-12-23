import React from "react";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import "./HiddenCard.css";

const HiddenCard: React.FC = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="hidden-card"></div>
      </HoverCardTrigger>
    </HoverCard>
  );
};

export default HiddenCard;
