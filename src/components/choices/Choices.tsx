import { Box } from "@radix-ui/themes";
import ButtonArray from "../button-array/ButtonArray";
import useGameStore, { GameState } from "../../hooks/zustand";
import { useEffect, useState } from "react";

const biddingLabels = [
  "Spades (2)",
  "Diamonds (3)",
  "Hearts (4)",
  "Clubs (5)",
  "Betl (6)",
  "Sans (7)",
];

function Choices() {
  const store = useGameStore((state) => state);
  const [labels, setLabels] = useState([] as Array<string>);

  function handleChoice() {}

  useEffect(() => {
    if (store.state == GameState.Bidding) {
      setLabels(biddingLabels.splice(store.handState.currentBid - 2));
    }
  }, [store.state]);

  return (
    <Box width="10em" mt="auto">
      <ButtonArray buttonLabels={labels} onButtonClick={() => {}} />
    </Box>
  );
}

export default Choices;
