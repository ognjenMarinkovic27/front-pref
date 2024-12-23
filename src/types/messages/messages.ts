import Card from "../card.ts";
import { GameType } from "../hand.ts";
import { ChoosingCardsMessage } from "./choosing-cards.ts";
import { ConnectedMessage, DisconnectedMessage } from "./connections.ts";
import { GameStateMessage } from "./game-state.ts";
import { GameTypeMessage } from "./game-type.ts";
import { LobbyMessage } from "./lobby.ts";
import { NewBidMessage } from "./new-bid.ts";
import { PlayerPassedMessage } from "./player-passed.ts";
import { ReadyMessage as ReadyNotificationMessage } from "./ready-notif.ts";
import { SendCardsMessage } from "./send-cards.ts";
import { StartGameMessage } from "./start-game.ts";
import { StartHandMessage } from "./start-hand.ts";

export interface BaseMessage {
  seq: number;
}

export type IncomingMessage =
  | LobbyMessage
  | ConnectedMessage
  | DisconnectedMessage
  | ReadyNotificationMessage
  | StartGameMessage
  | SendCardsMessage
  | StartHandMessage
  | NewBidMessage
  | PlayerPassedMessage
  | ChoosingCardsMessage
  | GameStateMessage
  | GameTypeMessage;

export type IncomingMessageType = IncomingMessage["type"];

export interface ReadyMessage extends BaseMessage {
  type: "ready";
}

export interface BidMessage extends BaseMessage {
  type: "bid";
}

export interface PassBidMessage extends BaseMessage {
  type: "pass-bid";
}

export interface ChooseDiscardMessage extends BaseMessage {
  type: "choose-discard";
  payload: {
    cards: Array<Card>;
  };
}

export interface ChooseGameTypeMessage extends BaseMessage {
  type: "choose-game";
  payload: {
    gameType: GameType;
  };
}

export type OutgoingMessage =
  | ReadyMessage
  | BidMessage
  | PassBidMessage
  | ChooseDiscardMessage
  | ChooseGameTypeMessage;
