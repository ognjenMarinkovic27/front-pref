import { useRef } from "react";
import useGameStore, { GameState } from "../../hooks/zustand";
import { GameType, isGameTypeLabel } from "../../types/hand";

type HandlerMap = {
  [K in GameState]?: (label: string) => void;
};

function useChoiceHandlers() {
  const send = useGameStore((state) => state.send);

  const handlers = useRef<HandlerMap>({
    [GameState.Bidding]: (label) => {
      const type = label == "Pass" ? "pass-bid" : "bid";
      send({ type, seq: 0 });
    },
    [GameState.ChoosingGameType]: (label) => {
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
    },
    [GameState.RespondingToGameType]: (label) => {
      const pass = label != "Going";

      send({
        type: "game-respond",
        payload: {
          pass,
        },
        seq: 0,
      });
    },
  });

  return handlers.current;
}

export default useChoiceHandlers;
