import Card from "./card"

export type GameType = 
    'None' 
    | 'Spades' 
    | 'Diamonds' 
    | 'Hearts'
    | 'Clubs'
    | 'Battle'
    | 'Sans'

interface ObjMap<T = any> {
    [key: string]: T;
}

export default interface HandState {
    firstPlayerPid: string
    currentPlayerPid: string
    currentBid: number
    currentRound: number
    passedPids: ObjMap<boolean>
    gameType: GameType
    playedCards: ObjMap<Card>
}