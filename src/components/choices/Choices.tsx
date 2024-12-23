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
    if (choiceHandlers[gameState]) {
      choiceHandlers[gameState](label);
    } else {
      console.warn("No choice handler for game state " + gameState);
    }
  }

  const [labels, setLabels] = useState([] as Array<string>);
  const labelHandlers = useLabelHandlers(setLabels);

  useEffect(() => {
    if (labelHandlers[gameState]) {
      labelHandlers[gameState]();
    } else {
      console.warn("No label handler for game state " + gameState);
    }
  }, [gameState, currentBidder, labelHandlers]);

  return (
    <Box width="10em" mt="auto">
      <ButtonArray buttonLabels={labels} onButtonClick={handleChoice} />
    </Box>
  );
}

export default Choices;
