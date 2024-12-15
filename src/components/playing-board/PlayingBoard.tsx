import { Box, Flex } from "@radix-ui/themes";
import Player from "../player/Player";
import useGameStore from "../../hooks/zustand";
import { useShallow } from "zustand/shallow";
import Choices from "../choices/Choices";

function PlayingBoard() {
  const [pid, otherPids] = useGameStore(
    useShallow((state) => [state.pid, state.otherPids])
  );

  return (
    <Box className="main-container" height="100vh" p="4em">
      <Box height="100%" maxWidth="1400px" m="auto">
        <Flex height="50%" justify="between">
          <Player name={otherPids[0]} hiddenCards={true} />
          <Choices />
          <Player name={otherPids[1]} hiddenCards={true} />
        </Flex>
        <Flex height="50%" justify="center">
          <Player name={pid} hiddenCards={false} />
        </Flex>
      </Box>
    </Box>
  );
}

export default PlayingBoard;
