import { store } from "../hooks/zustand";
import { isPlayerPassedMessage } from "../types/messages/player-passed";
import { IncomingMessage } from "../types/messages/messages";

export function playerPassedHandler(message: IncomingMessage) {
  console.log(message);
  if (!isPlayerPassedMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const makePassed = store.getState().makePassed;
  const moveToNextPlayer = store.getState().moveToNextPlayer;

  makePassed(message.payload.pid);
  moveToNextPlayer();
}
