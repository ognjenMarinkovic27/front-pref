import { Box } from "@radix-ui/themes";
import ButtonArray from "../button-array/ButtonArray";
import useGameStore, { GameState } from "../../hooks/zustand";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { GameType, isGameTypeLabel, ObjMap } from "../../types/hand";

const gameTypeLabels = [
  "Spades",
  "Diamonds",
  "Hearts",
  "Clubs",
  "Battle",
  "Sans",
];

function Choices() {
  const [
    gameState,
    send,
    firstBidderPid,
    pids,
    passedPids,
    currentBid,
    currentBidder,
  ] = useGameStore(
    useShallow((state) => [
      state.gameState,
      state.send,
      state.handState.firstBidderPid,
      state.pids,
      state.handState.passedPids,
      state.handState.currentBid,
      state.handState.currentBidder,
    ])
  );
  const [labels, setLabels] = useState([] as Array<string>);

  function handleChoice(label: string) {
    /* TODO: ? Ugly switch */
    switch (gameState) {
      case GameState.Bidding:
        if (label == "Pass") {
          send({
            type: "pass-bid",
            seq: 0,
          });
        } else {
          send({
            type: "bid",
            seq: 0,
          });
        }
        break;
      case GameState.ChoosingGameType:
        if (isGameTypeLabel(label)) {
          send({
            type: "choose-game",
            payload: {
              gameType: GameType[label],
            },
            seq: 0,
          });
        } else {
          console.error("Invalid Game Type");
        }
    }
  }

  useEffect(() => {
    console.log(gameState);
    /* TODO: ? Ugly switch */
    switch (gameState) {
      case GameState.Bidding:
        handleBiddingLabels();
        break;
      case GameState.ChoosingGameType:
        handleChoosingCardsLabels();
        break;
      case GameState.RespondingToGameType:
        handleRespondingToGameTypeLabels();
        break;
      default:
        setLabels(["My balls hanging"]);
    }
  }, [gameState, currentBidder]);

  function handleBiddingLabels() {
    const { nextBid, dontIncreaseBid } = calculateNextBid(
      firstBidderPid,
      pids,
      passedPids,
      currentBid
    );
    const bidButtonLabel = (dontIncreaseBid ? "My " : "") + nextBid;

    const labels: Array<string> = [];

    if (nextBid < 8) labels.push(bidButtonLabel);

    labels.push("Pass");

    setLabels(labels);
  }

  function handleChoosingCardsLabels() {
    const bid = currentBid;
    console.log(gameTypeLabels.slice(bid - 2));
    setLabels(gameTypeLabels.slice(bid - 2));
  }

  function handleRespondingToGameTypeLabels() {
    setLabels(["Coming :)", "Not Coming !!! :("]);
  }

  return (
    <Box width="10em" mt="auto">
      <ButtonArray buttonLabels={labels} onButtonClick={handleChoice} />
    </Box>
  );
}

function calculateNextBid(
  firstBidderPid: string,
  pids: Array<string>,
  passedPids: ObjMap<boolean>,
  currentBid: number
) {
  const dontIncreaseBid =
    firstBidderPid == pids[0] ||
    (passedPids[firstBidderPid] != undefined && pids[2] == firstBidderPid);

  const nextBid = currentBid + (dontIncreaseBid ? 0 : 1);

  return { nextBid, dontIncreaseBid };
}

export default Choices;
