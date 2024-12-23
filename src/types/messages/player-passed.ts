import { BaseMessage, IncomingMessage } from "./messages";

export interface PlayerPassedMessage extends BaseMessage {
  type: "player-passed";
  payload: {
    pid: string;
  };
}

export function isPlayerPassedMessage(
  p: IncomingMessage
): p is PlayerPassedMessage {
  return p.type == "player-passed";
}
