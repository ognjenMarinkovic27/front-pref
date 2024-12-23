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
  const myIndex = pidOrder.indexOf(state.pids[0]);
  const displayOrder = [
    state.pids[0],
    ...pidOrder.slice(myIndex + 1),
    ...pidOrder.slice(0, myIndex),
  ];

  state.setPids(displayOrder);
  state.setDealerPid(pidOrder[0]);
  state.start();
}
