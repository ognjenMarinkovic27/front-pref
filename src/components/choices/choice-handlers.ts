import { useEffect } from "react";
import useGameStore, { GameState } from "../../hooks/zustand";
import { GameType, isGameTypeLabel } from "../../types/hand";

type HandlerMap = {
  [key: number]: (label: string) => void;
};

function useChoiceHandlers() {
  const handlers: HandlerMap = {};

  const send = useGameStore((state) => state.send);

  useEffect(() => {
    handlers[GameState.Bidding] = (label) => {
      const type = label == "Pass" ? "pass-bid" : "bid";
      send({ type, seq: 0 });
    };

    handlers[GameState.ChoosingCards] = (label) => {
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
  }, []);

  return handlers;
}

export default useChoiceHandlers;
