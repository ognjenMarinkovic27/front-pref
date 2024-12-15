import { store } from "../hooks/zustand";
import { isReadyMessage } from "../types/messages/ready-notif.ts";
import { IncomingMessage } from "../types/messages/messages";

export function readyHandler(message: IncomingMessage) {
  console.log(message);
  if (!isReadyMessage(message)) {
    console.warn("Invalid message in handler");
    return;
  }

  const makeReady = store.getState().makeReady;

  makeReady(message.payload.readyPid);
}
