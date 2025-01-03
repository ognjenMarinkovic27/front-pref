import { BaseMessage, IncomingMessage } from "./messages";

export interface PlayerGoingMessage extends BaseMessage {
  type: "player-going";
  payload: {
    going: boolean;
    pid: string;
  };
}

export function isPlayerGoingMessage(
  p: IncomingMessage
): p is PlayerGoingMessage {
  return p.type == "player-going";
}
