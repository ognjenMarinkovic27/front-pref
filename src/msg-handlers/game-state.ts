import { store } from "../hooks/zustand.ts";
import { isGameStateMessage } from "../types/messages/game-state.ts";
import { IncomingMessage } from "../types/messages/messages.ts";

export function gameStateHandler(message: IncomingMessage) {
  console.log(message);
  if (!isGameStateMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const { setGameState } = store.getState();
  setGameState(message.payload.gameState);
}
