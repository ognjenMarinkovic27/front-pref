import { store } from "../hooks/zustand";
import { isNewBidMessage } from "../types/messages/new-bid";
import { IncomingMessage } from "../types/messages/messages";

export function newbidHandler(message: IncomingMessage) {
  console.log(message);
  if (!isNewBidMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const setBid = store.getState().setBid;
  const moveToNextPlayer = store.getState().moveToNextPlayer;

  setBid(message.payload.bid, message.payload.bidderPid);
  moveToNextPlayer();
}
