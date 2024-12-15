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

  const addOtherPid = store.getState().addOtherPid;
  addOtherPid(message.payload.pid);
}

export function disconnectedHandler(message: IncomingMessage) {
  console.log(message);
  if (!isDisconnectedMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const removeOtherPid = store.getState().removeOtherPid;
  removeOtherPid(message.payload.pid);
}
