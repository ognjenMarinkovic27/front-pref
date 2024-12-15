import { BaseMessage, IncomingMessage } from "./messages";

export interface StartHandMessage extends BaseMessage {
  type: "start-hand";
}

export function isStartHandMessage(p: IncomingMessage): p is StartHandMessage {
  return p.type == "start-hand";
}
