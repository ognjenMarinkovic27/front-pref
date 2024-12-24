import { useRef } from "react";
import useGameStore, { GameState } from "../../hooks/zustand";
import { GameType, ObjMap } from "../../types/hand";
import { useShallow } from "zustand/shallow";

type HandlerMap = {
  [K in GameState]?: () => void;
};

const gameTypeLabels = Object.keys(GameType);

type setLabelsFn = React.Dispatch<React.SetStateAction<string[]>>;

function useLabelHandlers(setLabels: setLabelsFn) {
  const [firstBidderPid, pids, passedPids, currentBid] = useGameStore(
    useShallow((state) => [
      state.handState.firstBidderPid,
      state.pids,
      state.handState.passedPids,
      state.handState.currentBid,
    ])
  );

  const handlers = useRef<HandlerMap>({
    [GameState.Bidding]: () => {
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
    },
    [GameState.ChoosingGameType]: () => {
      const bid = currentBid;
      console.log(gameTypeLabels.slice(bid - 1));
      setLabels(gameTypeLabels.slice(bid - 1));
    },
    [GameState.RespondingToGameType]: () => {
      setLabels(["Coming :)", "Not Coming !!! :("]);
    },
  });

  return handlers.current;
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

export default useLabelHandlers;
