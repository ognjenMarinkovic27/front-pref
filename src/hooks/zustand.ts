import { create } from "zustand";
import HandState, { GameType } from "../types/hand";
import Card from "../types/card";
import { immer } from "zustand/middleware/immer";
import { OutgoingMessage } from "../types/messages/messages";

interface ObjMap<T = any> {
  [key: string]: T;
}

type SendFn = <T extends OutgoingMessage>(message: T) => void;

export const GameState = {
  Waiting: 0,
  Bidding: 1,
  PlayNow: 2,
  ClaimPlayNowType: 3,
  ChoosingGameType: 4,
  RespondingToGameType: 5,
  ChoosingCards: 6,
  PlayingHand: 7,
} as const;

export type GameState = (typeof GameState)[keyof typeof GameState];

export interface GameStoreState {
  gameState: GameState;
  dealerPlayerPid: string;
  handState: HandState;
  readyPids: ObjMap<boolean>;
  started: boolean;
  cards: Array<Card>;
  pids: Array<string>;
  send: SendFn;
}

interface GameActions {
  start: () => void;
  setGameState: (gameState: GameState) => void;
  makeReady: (pid: string) => void;
  startNewHand: (firstPlayerPid: string) => void;
  startNewRound: (firstPlayerPid: string) => void;
  setDealerPid: (pid: string) => void;
  setCurrentPlayer: (pid: string) => void;
  moveToNextPlayer: () => void;
  makePassed: (pid: string) => void;
  resetPassed: () => void;
  setBid: (bid: number, bidderPid: string) => void;
  setGameType: (type: GameType) => void;
  pickCard: (card: Card) => void;
  discardCard: (card: Card) => void;
  playCard: (pid: string, card: Card) => void;
  setHiddenCards: (cards: Array<Card>) => void;
  setCards: (cards: Array<Card>) => void;
  addPid: (pid: string) => void;
  removePid: (pid: string) => void;
  setPids: (pids: Array<string>) => void;
  setSendFn: (fn: SendFn) => void;
}

const dummyStartState = {
  /* TODO: investigate */
  gameState: GameState.Waiting as GameState,
  dealerPlayerPid: "",
  readyPids: {},
  handState: {
    firstBidderPid: "",
    currentPlayerPid: "",
    passedPids: {},
    gameType: GameType.None as GameType,
    currentBid: 1,
    currentBidder: "",
    currentRound: 0,
    playedCards: {},
    hiddenCards: [] as Array<Card>,
  },
  cards: [] as Array<Card>,
  pids: [] as Array<string>,
  started: false,
  send: <T extends OutgoingMessage>(_: T) => {
    console.warn("Send function not set");
  },
};

const useGameStore = create<GameStoreState & GameActions>()(
  immer((set) => ({
    ...dummyStartState,
    start: () =>
      set((state) => {
        state.started = true;
      }),
    setGameState: (gameState: GameState) =>
      set((state) => {
        state.gameState = gameState;
      }),
    makeReady: (pid: string) =>
      set((state) => {
        state.readyPids[pid] = true;
      }),
    startNewHand: (firstPlayerPid: string) =>
      set((state) => {
        state.gameState = GameState.Bidding;
        state.handState.firstBidderPid = "";
        state.handState.currentPlayerPid = firstPlayerPid;
        state.handState.passedPids = {};
        state.handState.currentBid = 1;
        state.handState.currentRound = 0;
        state.handState.playedCards = {};
      }),
    startNewRound: (firstPlayerPid: string) =>
      set((state) => {
        state.handState.firstBidderPid = "";
        state.handState.currentPlayerPid = firstPlayerPid;
        state.handState.playedCards = {};
        state.handState.currentRound++;
      }),
    setDealerPid: (pid: string) =>
      set((state) => {
        state.dealerPlayerPid = pid;
      }),
    setCurrentPlayer: (pid: string) =>
      set((state) => {
        state.handState.currentPlayerPid = pid;
      }),
    moveToNextPlayer: () =>
      set((state) => {
        const ind = state.pids.indexOf(state.handState.currentPlayerPid);
        let next = ind;
        do {
          next = (next + 1) % state.pids.length;
          state.handState.currentPlayerPid = state.pids[next];
        } while (
          state.handState.passedPids[state.pids[next]] != undefined &&
          next != ind
        );
      }),
    makePassed: (pid: string) =>
      set((state) => {
        state.handState.passedPids[pid] = true;
      }),
    resetPassed: () =>
      set((state) => {
        state.handState.passedPids = {};
      }),
    setBid: (bid: number, bidderPid: string) =>
      set((state) => {
        state.handState.currentBid = bid;

        if (state.handState.firstBidderPid == "") {
          state.handState.firstBidderPid = bidderPid;
        }

        state.handState.currentBidder = bidderPid;
      }),
    setGameType: (type: GameType) =>
      set((state) => {
        state.handState.gameType = type;
      }),
    pickCard: (card: Card) =>
      set((state) => {
        console.log(state.handState.hiddenCards, state.cards, card);
        moveCard(state.handState.hiddenCards, state.cards, card);
      }),
    discardCard: (card: Card) =>
      set((state) => {
        if (state.handState.hiddenCards.length < 2) {
          moveCard(state.cards, state.handState.hiddenCards, card);
        }
      }),
    playCard: (pid: string, card: Card) =>
      set((state) => {
        const ind = getCardIndex(state.cards, card);
        state.cards.splice(ind, 1);
        state.handState.playedCards[pid] = card;
      }),
    setHiddenCards: (cards: Array<Card>) =>
      set((state) => {
        state.handState.hiddenCards = cards;
      }),
    setCards: (cards: Array<Card>) =>
      set((state) => {
        state.cards = cards;
      }),
    addPid: (pid: string) =>
      set((state) => {
        state.pids.push(pid);
      }),
    removePid: (rpid: string) =>
      set((state) => {
        state.pids = state.pids.filter((pid) => pid != rpid);
      }),
    setPids: (pids: Array<string>) =>
      set((state) => {
        state.pids = pids;
      }),
    setSendFn: (fn: SendFn) =>
      set((state) => {
        state.send = fn;
      }),
  }))
);

function getCardIndex(array: Array<Card>, card: Card): number {
  /* TODO: Ugly + I hate JavaScript */
  const ind = array.findIndex(
    (c) => c.value == card.value && c.suit == card.suit
  );

  return ind;
}

function moveCard(array1: Array<Card>, array2: Array<Card>, card: Card) {
  const ind = getCardIndex(array1, card);
  if (ind > -1) {
    array1.splice(ind, 1);
    array2.push(card);
  }
}

export default useGameStore;
export const store = useGameStore;
