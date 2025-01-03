import { Box, Flex, Text } from "@radix-ui/themes";
import Player from "../player/Player";
import useGameStore, { GameState } from "../../hooks/zustand";
import { useShallow } from "zustand/shallow";
import Choices from "../choices/Choices";
import ChooseCards from "../choose-cards/ChooseCards";
import CardTable from "../card-table/CardTable";

function PlayingBoard() {
  const [pids, current, bid, bidder, gameState] = useGameStore(
    useShallow((state) => [
      state.pids,
      state.handState.currentPlayerPid,
      state.handState.currentBid,
      state.handState.currentBidder,
      state.gameState,
    ])
  );

  const myTurn = pids[0] == current;

  function renderCenter() {
    switch (gameState) {
      case GameState.ChoosingCards:
        return <ChooseCards />;
      case GameState.PlayingHand:
        return <CardTable />;
      default:
        return myTurn ? <Choices /> : <></>;
    }
  }

  return (
    <Box
      className="main-container"
      height="100vh"
      p={{ initial: "0em", lg: "4em" }}
    >
      <Box height="100%" maxWidth="1400px" m="auto">
        <Flex height="50%" justify="between">
          <Player name={pids[1]} hiddenCards={true} />
          <Flex direction="column">
            <Text>
              Na potezu: {current}.<br />
              Bid info: {bid} {bidder}{" "}
            </Text>
            {renderCenter()}
          </Flex>
          <Player name={pids[2]} hiddenCards={true} />
        </Flex>
        <Flex height="50%" justify="center">
          <Player name={pids[0]} hiddenCards={false} />
        </Flex>
      </Box>
    </Box>
  );
}

export default PlayingBoard;
