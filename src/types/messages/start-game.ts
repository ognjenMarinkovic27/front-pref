import { BaseMessage, IncomingMessage } from "./messages";

export interface StartGameMessage extends BaseMessage {
  type: "start-game";
  payload: {
    pidOrder: Array<string>;
  };
}

export function isStartGameMessage(p: IncomingMessage): p is StartGameMessage {
  return p.type == "start-game";
}
