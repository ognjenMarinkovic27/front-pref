import Card from "../card";
import { BaseMessage, IncomingMessage } from "./messages";

export interface SendCardsMessage extends BaseMessage {
  type: "send-cards";
  payload: {
    cards: Array<Card>;
  };
}

export function isSendCardsMessage(p: IncomingMessage): p is SendCardsMessage {
  return p.type == "send-cards";
}
