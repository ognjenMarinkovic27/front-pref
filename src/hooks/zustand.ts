import { create } from "zustand";
import HandState, { GameType } from "../types/hand";
import Card from "../types/card";
import { immer } from "zustand/middleware/immer";
import { OutgoingMessage } from "../types/messages/messages";

interface ObjMap<T = any> {
  [key: string]: T;
}

type SendFn = <T extends OutgoingMessage>(message: T) => void;

interface GameState {
  dealerPlayerPid: string;
  handState: HandState;
  readyPids: ObjMap<boolean>;
  started: boolean;
  cards: Array<Card>;
  pid: string;
  otherPids: Array<string>;
  send: SendFn;
}

interface GameActions {
  start: () => void;
  makeReady: (pid: string) => void;
  startNewHand: (firstPlayerPid: string) => void;
  startNewRound: (firstPlayerPid: string) => void;
  setCurrentPlayer: (pid: string) => void;
  makePassed: (pid: string) => void;
  setCurrentBid: (bid: number) => void;
  setGameType: (type: GameType) => void;
  playCard: (pid: string, card: Card) => void;
  setCards: (cards: Array<Card>) => void;
  setPid: (pid: string) => void;
  addOtherPid: (pid: string) => void;
  removeOtherPid: (pid: string) => void;
  setOtherPids: (pids: Array<string>) => void;
  setSendFn: (fn: SendFn) => void;
}

const dummyStartState = {
  dealerPlayerPid: "",
  readyPids: {},
  handState: {
    firstPlayerPid: "",
    currentPlayerPid: "",
    passedPids: {},
    gameType: "None" as GameType,
    currentBid: 2,
    currentRound: 0,
    playedCards: {},
  },
  cards: [] as Array<Card>,
  pid: "",
  otherPids: [] as Array<string>,
  started: false,
  send: <T extends OutgoingMessage>(_: T) => {
    console.warn("Send function not set");
  },
};

const useGameStore = create<GameState & GameActions>()(
  immer((set) => ({
    ...dummyStartState,
    start: () =>
      set((state) => {
        state.started = true;
      }),
    makeReady: (pid: string) =>
      set((state) => {
        state.readyPids[pid] = true;
      }),
    startNewHand: (firstPlayerPid: string) =>
      set((state) => {
        state.handState.firstPlayerPid = firstPlayerPid;
        state.handState.currentPlayerPid = firstPlayerPid;
        state.handState.passedPids = {};
        state.handState.currentBid = 2;
        state.handState.currentRound = 0;
        state.handState.playedCards = {};
      }),
    startNewRound: (firstPlayerPid: string) =>
      set((state) => {
        state.handState.firstPlayerPid = firstPlayerPid;
        state.handState.currentPlayerPid = firstPlayerPid;
        state.handState.playedCards = {};
        state.handState.currentRound++;
      }),
    setCurrentPlayer: (pid: string) =>
      set((state) => {
        state.handState.currentPlayerPid = pid;
      }),
    makePassed: (pid: string) =>
      set((state) => {
        state.handState.passedPids[pid] = true;
      }),
    setCurrentBid: (bid: number) =>
      set((state) => {
        state.handState.currentBid = bid;
      }),
    setGameType: (type: GameType) =>
      set((state) => {
        state.handState.gameType = type;
      }),
    playCard: (pid: string, card: Card) =>
      set((state) => {
        state.handState.playedCards[pid] = card;
      }),
    setCards: (cards: Array<Card>) =>
      set((state) => {
        state.cards = cards;
      }),
    setPid: (pid: string) =>
      set((state) => {
        state.pid = pid;
      }),
    addOtherPid: (pid: string) =>
      set((state) => {
        state.otherPids.push(pid);
      }),
    removeOtherPid: (rpid: string) =>
      set((state) => {
        state.otherPids = state.otherPids.filter((pid) => pid != rpid);
      }),
    setOtherPids: (pids: Array<string>) =>
      set((state) => {
        state.otherPids = pids;
      }),
    setSendFn: (fn: SendFn) =>
      set((state) => {
        state.send = fn;
      }),
  }))
);

export default useGameStore;
export const store = useGameStore;
