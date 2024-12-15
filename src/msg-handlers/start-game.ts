import { store } from "../hooks/zustand.ts";
import { isStartGameMessage } from "../types/messages/start-game.ts";
import { IncomingMessage } from "../types/messages/messages.ts";

export function startGameHandler(message: IncomingMessage) {
  console.log(message);
  if (!isStartGameMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const state = store.getState();

  const pidOrder = message.payload.pidOrder;
  const myIndex = pidOrder.indexOf(state.pid);
  const displayOrder = [
    ...pidOrder.splice(myIndex + 1),
    ...pidOrder.splice(0, myIndex),
  ];

  state.setOtherPids(displayOrder);
  state.start();
}
