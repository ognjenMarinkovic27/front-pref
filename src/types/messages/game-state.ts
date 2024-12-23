import { GameState } from "../../hooks/zustand";
import { BaseMessage, IncomingMessage } from "./messages";

export interface GameStateMessage extends BaseMessage {
  type: "game-state";
  payload: {
    gameState: GameState;
  };
}

export function isGameStateMessage(p: IncomingMessage): p is GameStateMessage {
  return p.type == "game-state";
}
