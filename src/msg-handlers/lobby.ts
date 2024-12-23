import { store } from "../hooks/zustand";
import { isLobbyMessage } from "../types/messages/lobby";
import { IncomingMessage } from "../types/messages/messages";

export function lobbyHandler(message: IncomingMessage) {
  console.log(message);
  if (!isLobbyMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const state = store.getState();
  const addPid = state.addPid;

  message.payload.pids.map((pid) => {
    if (pid != state.pids[0]) addPid(pid);
  });
}
