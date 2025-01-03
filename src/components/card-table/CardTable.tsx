import { Flex } from "@radix-ui/themes";
import useGameStore from "../../hooks/zustand";
import { useShallow } from "zustand/shallow";
import PlayingCard from "../playing-card/PlayingCard";

function CardTable() {
  const [pids, playedCards] = useGameStore(
    useShallow((state) => [state.pids, state.handState.playedCards])
  );

  const isCardPlayed = pids.map((pid) => playedCards[pid] != undefined);

  function displayCard(index: number) {
    return isCardPlayed[index] ? (
      <PlayingCard card={playedCards[pids[index]]}></PlayingCard>
    ) : undefined;
  }

  return (
    <Flex direction="column">
      <Flex>
        {displayCard(1)}
        {displayCard(2)}
      </Flex>
      {displayCard(0)}
    </Flex>
  );
}

export default CardTable;
