import { store } from "../hooks/zustand";
import {
  isConnectedMessage,
  isDisconnectedMessage,
} from "../types/messages/connections";
import { IncomingMessage } from "../types/messages/messages";

export function connectedHandler(message: IncomingMessage) {
  console.log(message);
  if (!isConnectedMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const newPid = message.payload.pid;
  const state = store.getState();

  /* After we connect the server responds with player-connected 
  for our connection as well. We want to ignore this message. I
  left it this way for possibly implementing acks. */
  if (newPid != state.pids[0]) {
    const addPid = store.getState().addPid;
    addPid(message.payload.pid);
  }
}

export function disconnectedHandler(message: IncomingMessage) {
  console.log(message);
  if (!isDisconnectedMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const removePid = store.getState().removePid;
  removePid(message.payload.pid);
}
