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
  const [pid, myTurn, cards, gameState, discardCard, playCard, send] =
    useGameStore(
      useShallow((state) => [
        state.pids[0],
        state.pids[0] == state.handState.currentPlayerPid,
        state.cards,
        state.gameState,
        state.discardCard,
        state.playCard,
        state.send,
      ])
    );

  function handleClick(card: Card) {
    if (!myTurn) return;

    switch (gameState) {
      case GameState.ChoosingCards:
        discardCard(card);
        break;
      case GameState.PlayingHand:
        playCard(pid, card);
        send({
          type: "play-card",
          payload: {
            card,
          },
          seq: 0,
        });
        break;
      default:
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
        <HiddenCardHand />
      ) : (
        <CardHand cards={cards} onClick={handleClick} />
      )}
    </Flex>
  );
}

export default Player;
