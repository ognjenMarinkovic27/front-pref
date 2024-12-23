import { Flex } from "@radix-ui/themes";
import Card from "../../types/card";
import PlayingCard from "../playing-card/PlayingCard";

interface CardHandProps {
  cards: Array<Card>;
  onClick?: (card: Card) => void;
}

function CardHand({ cards, onClick }: CardHandProps) {
  function sortOrder(a: Card, b: Card): number {
    if (a.suit != b.suit) return a.suit - b.suit;

    return b.value - a.value;
  }

  const sortedCards = cards.slice().sort(sortOrder);

  return (
    <Flex>
      {sortedCards.map((card, ind) => (
        <PlayingCard
          key={ind}
          value={card.value}
          suit={card.suit}
          onClick={onClick}
        />
      ))}
    </Flex>
  );
}

export default CardHand;
