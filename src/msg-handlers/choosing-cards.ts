import { GameState, store } from "../hooks/zustand.ts";
import { isChoosingCardsMessage } from "../types/messages/choosing-cards.ts";
import { IncomingMessage } from "../types/messages/messages.ts";

export function choosingCardsHandler(message: IncomingMessage) {
  console.log(message);
  if (!isChoosingCardsMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const { setCurrentPlayer, setGameState, setHiddenCards } = store.getState();

  setCurrentPlayer(message.payload.chooserPid);
  setHiddenCards(message.payload.hiddenCards);
  setGameState(GameState.ChoosingCards);
}
