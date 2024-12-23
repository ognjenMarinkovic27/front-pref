import { Flex, Text } from "@radix-ui/themes";
import useGameStore, { GameState } from "../../hooks/zustand";
import { useShallow } from "zustand/shallow";
import HiddenCardHand from "../hidden-card-hand/HiddenCardHand";
import CardHand from "../card-hand/CardHand";
import Card from "../../types/card";

interface PlayerProps {
  name: string;
  hiddenCards: boolean;
}

function Player({ name, hiddenCards }: PlayerProps) {
  const [cards, rounds, played, gameState, discardCard] = useGameStore(
    useShallow((state) => [
      state.cards,
      state.handState.currentRound,
      state.handState.playedCards,
      state.gameState,
      state.discardCard,
    ])
  );
  // TODO: kinda ugly
  const cardCount = 10 - rounds - (played.name != undefined ? 1 : 0);

  function handleClick(card: Card) {
    if (gameState == GameState.ChoosingCards) {
      discardCard(card);
    }
  }

  return (
    <Flex
      direction="column"
      gap="5"
      align="center"
      height="100%"
      justify={hiddenCards ? "start" : "center"}
    >
      <Text>{name}</Text>
      {hiddenCards ? (
        <HiddenCardHand count={cardCount} />
      ) : (
        <CardHand cards={cards} onClick={handleClick} />
      )}
    </Flex>
  );
}

export default Player;
