import { BaseMessage, IncomingMessage } from "./messages";

export interface NewBidMessage extends BaseMessage {
  type: "new-bid";
  payload: {
    bidderPid: string;
    bid: number;
  };
}

export function isNewBidMessage(p: IncomingMessage): p is NewBidMessage {
  return p.type == "new-bid";
}
