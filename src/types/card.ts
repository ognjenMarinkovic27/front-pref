export const CardSuit = {
    Spades: 0,
    Diamonds: 1,
    Hearts: 2,
    Clubs: 3,
} as const;
  
type CardSuit = typeof CardSuit[keyof typeof CardSuit];

export const CardValue = {
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Jack: 11,
    Queen: 12,
    King: 13,
    Ace: 14,
} as const;

export type CardValue = typeof CardValue[keyof typeof CardValue];

export default interface Card {
    suit: CardSuit
    value: CardValue
}