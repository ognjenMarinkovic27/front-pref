import { useEffect, useState } from "react";
import useGameStore, { GameState } from "../../hooks/zustand";
import { GameType, ObjMap } from "../../types/hand";
import { useShallow } from "zustand/shallow";

type HandlerMap = {
  [key: number]: () => void;
};

const gameTypeLabels = Object.keys(GameType);

type setLabelsFn = React.Dispatch<React.SetStateAction<string[]>>;

function useLabelHandlers(setLabels: setLabelsFn) {
  const [handlers, setHandlers] = useState({} as HandlerMap);

  const [firstBidderPid, pids, passedPids, currentBid] = useGameStore(
    useShallow((state) => [
      state.handState.firstBidderPid,
      state.pids,
      state.handState.passedPids,
      state.handState.currentBid,
    ])
  );

  useEffect(() => {
    const h: HandlerMap = {};

    h[GameState.Bidding] = () => {
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
    };

    h[GameState.ChoosingGameType] = () => {
      const bid = currentBid;
      console.log(gameTypeLabels.slice(bid - 2));
      setLabels(gameTypeLabels.slice(bid - 2));
    };

    h[GameState.RespondingToGameType] = () => {
      setLabels(["Coming :)", "Not Coming !!! :("]);
    };

    setHandlers(h);
  }, []);

  return handlers;
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
