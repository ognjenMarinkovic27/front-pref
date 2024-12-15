import { GameState, store } from "../hooks/zustand.ts";
import { IncomingMessage } from "../types/messages/messages.ts";
import { isStartHandMessage } from "../types/messages/start-hand.ts";

export function startHandHandler(message: IncomingMessage) {
  console.log(message);
  if (!isStartHandMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const setState = store.getState().setState;

  setState(GameState.Bidding);
}
