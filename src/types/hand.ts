import Card from "./card";

export const GameType = {
  None: 0,
  Spades: 2,
  Diamonds: 3,
  Hearts: 4,
  Clubs: 5,
  Battle: 6,
  Sans: 7,
} as const;

export type GameType = (typeof GameType)[keyof typeof GameType];
export type GameTypeLabel = keyof typeof GameType;

export function isGameTypeLabel(str: string): str is GameTypeLabel {
  return Object.keys(GameType).includes(str);
}

export interface ObjMap<T = any> {
  [key: string]: T;
}

export default interface HandState {
  firstBidderPid: string;
  currentPlayerPid: string;
  currentBid: number;
  currentBidder: string;
  currentRound: number;
  passedPids: ObjMap<boolean>;
  gameType: GameType;
  playedCards: ObjMap<Card>;
  hiddenCards: Array<Card>;
}
