import { store } from "../hooks/zustand";
import { IncomingMessage } from "../types/messages/messages";
import { isPlayerGoingMessage } from "../types/messages/player-going";

export function playerGoingHandler(message: IncomingMessage) {
  console.log(message);
  if (!isPlayerGoingMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const makePassed = store.getState().makePassed;
  const moveToNextPlayer = store.getState().moveToNextPlayer;

  if (!message.payload.going) {
    makePassed(message.payload.pid);
  }

  moveToNextPlayer();
}
