import Card from "../card";
import { BaseMessage, IncomingMessage } from "./messages";

export interface ChoosingCardsMessage extends BaseMessage {
  type: "choosing-cards";
  payload: {
    chooserPid: string;
    hiddenCards: Array<Card>;
  };
}

export function isChoosingCardsMessage(
  p: IncomingMessage
): p is ChoosingCardsMessage {
  return p.type == "choosing-cards";
}
