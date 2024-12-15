import { BaseMessage, IncomingMessage } from "./messages";

export interface ConnectedMessage extends BaseMessage {
  type: "player-connected";
  payload: {
    pid: string;
  };
}

export function isConnectedMessage(
  message: IncomingMessage
): message is ConnectedMessage {
  return message.type == "player-connected";
}

export interface DisconnectedMessage extends BaseMessage {
  type: "player-disconnected";
  payload: {
    pid: string;
  };
}

export function isDisconnectedMessage(
  message: IncomingMessage
): message is DisconnectedMessage {
  return message.type == "player-disconnected";
}
