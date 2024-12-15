import { store } from "../hooks/zustand.ts";
import { isSendCardsMessage } from "../types/messages/send-cards.ts";
import { IncomingMessage } from "../types/messages/messages.ts";

export function sendCardsHandler(message: IncomingMessage) {
  console.log(message);
  if (!isSendCardsMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const setCards = store.getState().setCards;

  setCards(message.payload.cards);
}
