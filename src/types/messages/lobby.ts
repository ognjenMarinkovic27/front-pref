import { BaseMessage, IncomingMessage } from "./messages";

export interface LobbyMessage extends BaseMessage {
  type: "lobby-state";
  payload: {
    pids: Array<string>;
  };
}

export function isLobbyMessage(p: IncomingMessage): p is LobbyMessage {
  return p.type == "lobby-state";
}
