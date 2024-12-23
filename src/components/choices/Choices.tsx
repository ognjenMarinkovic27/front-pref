import { Box } from "@radix-ui/themes";
import ButtonArray from "../button-array/ButtonArray";
import useGameStore from "../../hooks/zustand";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import useChoiceHandlers from "./choice-handlers";
import useLabelHandlers from "./label-handlers";

function Choices() {
  const [gameState, currentBidder] = useGameStore(
    useShallow((state) => [state.gameState, state.handState.currentBidder])
  );

  const choiceHandlers = useChoiceHandlers();
  function handleChoice(label: string) {
    choiceHandlers[gameState](label);
  }

  const [labels, setLabels] = useState([] as Array<string>);
  const labelHandlers = useLabelHandlers(setLabels);

  useEffect(() => {
    labelHandlers[gameState]();
  }, [gameState, currentBidder]);

  return (
    <Box width="10em" mt="auto">
      <ButtonArray buttonLabels={labels} onButtonClick={handleChoice} />
    </Box>
  );
}

export default Choices;
