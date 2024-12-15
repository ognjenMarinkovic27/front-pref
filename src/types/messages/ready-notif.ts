import { BaseMessage, IncomingMessage } from "./messages";

export interface ReadyMessage extends BaseMessage {
  type: "ready-notif";
  payload: {
    readyPid: string;
  };
}

export function isReadyMessage(p: IncomingMessage): p is ReadyMessage {
  return p.type == "ready-notif";
}
