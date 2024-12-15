import { ConnectedMessage, DisconnectedMessage } from "./connections.ts";
import { LobbyMessage } from "./lobby.ts";
import { ReadyMessage as ReadyNotificationMessage } from "./ready-notif.ts";
import { StartGameMessage } from "./start-game.ts";

export interface BaseMessage {
  seq: number;
}

export type IncomingMessage =
  | LobbyMessage
  | ConnectedMessage
  | DisconnectedMessage
  | ReadyNotificationMessage
  | StartGameMessage;

export type IncomingMessageType = IncomingMessage["type"];

export interface ReadyMessage extends BaseMessage {
  type: "ready";
}

export type OutgoingMessage = ReadyMessage;
