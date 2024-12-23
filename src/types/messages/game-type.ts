import { GameType } from "../hand";
import { BaseMessage, IncomingMessage } from "./messages";

export interface GameTypeMessage extends BaseMessage {
  type: "game-type";
  payload: {
    gameType: GameType;
  };
}

export function isGameTypeMessage(p: IncomingMessage): p is GameTypeMessage {
  return p.type == "game-type";
}
