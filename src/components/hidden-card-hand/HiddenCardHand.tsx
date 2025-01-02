import { Flex } from "@radix-ui/themes";
import HiddenCard from "../hideen-card/HiddenCard";
import useGameStore from "../../hooks/zustand";
import { useShallow } from "zustand/shallow";

function HiddenCardHand() {
  const [rounds, played] = useGameStore(
    useShallow((state) => [
      state.handState.currentRound,
      state.handState.playedCards,
    ])
  );
  // TODO: kinda ugly
  const count = 10 - rounds - (played.name != undefined ? 1 : 0);

  return (
    <Flex direction={{ initial: "column", lg: "row" }}>
      {Array.from({ length: count }, (_, i) => (
        <HiddenCard key={i} />
      ))}
    </Flex>
  );
}

export default HiddenCardHand;
