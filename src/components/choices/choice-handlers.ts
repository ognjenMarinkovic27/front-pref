import { useEffect, useState } from "react";
import useGameStore, { GameState } from "../../hooks/zustand";
import { GameType, isGameTypeLabel } from "../../types/hand";

type HandlerMap = {
  [key: number]: (label: string) => void;
};

function useChoiceHandlers() {
  const [handlers, setHandlers] = useState({} as HandlerMap);

  const send = useGameStore((state) => state.send);

  useEffect(() => {
    const h: HandlerMap = {};

    h[GameState.Bidding] = (label) => {
      const type = label == "Pass" ? "pass-bid" : "bid";
      send({ type, seq: 0 });
    };

    h[GameState.ChoosingGameType] = (label) => {
      if (!isGameTypeLabel(label)) {
        console.error("Invalid Game Type");
        return;
      }

      send({
        type: "choose-game",
        payload: {
          gameType: GameType[label],
        },
        seq: 0,
      });
    };

    setHandlers(h);
  }, []);

  return handlers;
}

export default useChoiceHandlers;
