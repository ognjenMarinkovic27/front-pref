import { GameState, store } from "../hooks/zustand.ts";
import { isGameTypeMessage } from "../types/messages/game-type.ts";
import { IncomingMessage } from "../types/messages/messages.ts";

export function gameTypeHandler(message: IncomingMessage) {
  console.log(message);
  if (!isGameTypeMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const { setGameType, setGameState, resetPassed, moveToNextPlayer } =
    store.getState();
  setGameType(message.payload.gameType);
  setGameState(GameState.RespondingToGameType);
  resetPassed();
  moveToNextPlayer();
}
