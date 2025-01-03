import { useState, useEffect, useCallback, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  IncomingMessageType,
  IncomingMessage,
  OutgoingMessage,
} from "../types/messages/messages";
import { lobbyHandler } from "../msg-handlers/lobby";
import {
  connectedHandler,
  disconnectedHandler,
} from "../msg-handlers/connections";
import { readyHandler } from "../msg-handlers/ready";
import useGameStore from "./zustand";
import { startGameHandler } from "../msg-handlers/start-game";
import { sendCardsHandler } from "../msg-handlers/send-cards";
import { startHandHandler } from "../msg-handlers/start-hand";
import { newbidHandler } from "../msg-handlers/new-bid";
import { playerPassedHandler } from "../msg-handlers/player-passed";
import { choosingCardsHandler } from "../msg-handlers/choosing-cards";
import { gameStateHandler } from "../msg-handlers/game-state";
import { gameTypeHandler } from "../msg-handlers/game-type";
import { playerGoingHandler } from "../msg-handlers/player-going";

type MessageHandler<T> = (payload: T) => void;

const WS_URL = `ws://localhost:8080/ws?pid=`;

function useGameWebSocket(pid: string | undefined) {
  if (pid == undefined) {
    return {
      loading: false,
      sendMessageWithType: () => {},
    };
  }

  const [loading, setLoading] = useState(true);
  const handlers = useRef<{ [K in IncomingMessageType]?: MessageHandler<any> }>(
    {
      "lobby-state": lobbyHandler,
      "player-connected": connectedHandler,
      "player-disconnected": disconnectedHandler,
      "ready-notif": readyHandler,
      "start-game": startGameHandler,
      "start-hand": startHandHandler,
      "send-cards": sendCardsHandler,
      "new-bid": newbidHandler,
      "player-passed": playerPassedHandler,
      "choosing-cards": choosingCardsHandler,
      "game-state": gameStateHandler,
      "game-type": gameTypeHandler,
      "player-going": playerGoingHandler,
    }
  );

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    pid ? `${WS_URL}${pid}` : null,
    {
      shouldReconnect: () => true,
    }
  );

  const setSendFn = useGameStore((state) => state.setSendFn);

  // Handle connection state
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      setLoading(false);

      /* TODO: Is this disgusting? */
      setSendFn(sendMessageWithType);

      console.log("WebSocket connection open");
    } else {
      setLoading(true);
    }
  }, [readyState]);

  // Handle incoming messages
  useEffect(() => {
    if (lastMessage) {
      try {
        const parsedMessage: IncomingMessage = JSON.parse(lastMessage.data);
        const handler = handlers.current[parsedMessage.type];
        if (handler) {
          handler(parsedMessage);
        } else {
          console.warn(
            `No handler for message type: ${parsedMessage.type}`,
            lastMessage,
            parsedMessage
          );
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    }
  }, [lastMessage]);

  // Send a message with a specific type and payload
  const sendMessageWithType = useCallback(
    <T extends OutgoingMessage>(message: T) => {
      if (sendMessage) {
        sendMessage(JSON.stringify(message));
      }
    },
    [sendMessage]
  );

  return {
    loading,
  };
}

export default useGameWebSocket;
