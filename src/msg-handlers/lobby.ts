import { store } from "../hooks/zustand";
import { isLobbyMessage } from "../types/messages/lobby";
import { IncomingMessage } from "../types/messages/messages";

export function lobbyHandler(message: IncomingMessage) {
  console.log(message);
  if (!isLobbyMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const pid = store.getState().pid;
  const setOtherPids = store.getState().setOtherPids;

  setOtherPids(message.payload.pids.filter((opid) => opid != pid));
}
