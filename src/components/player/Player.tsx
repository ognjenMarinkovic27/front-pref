import {  Flex, Text } from "@radix-ui/themes";
import useGameStore from "../../hooks/zustand";
import { useShallow } from "zustand/shallow";
import HiddenCardHand from "../hidden-card-hand/hidden-card-hand";
import PlayingCard from "../playing-card/PlayingCard";

interface PlayerProps {
    name: string
    hiddenCards: boolean
}

function Player({ name, hiddenCards } : PlayerProps) {

    const [cards, rounds, played] = useGameStore(useShallow(
        state => [state.cards, state.handState.currentRound, state.handState.playedCards]
    ))
    // TODO: kinda ugly
    const cardCount = 10 - rounds - (played.name != undefined ? 1 : 0)

    return (
        <Flex direction="column" gap="5" align="center" height="100%" justify={hiddenCards ? "start" : "center"}>
            <Text>{name}</Text>
            {hiddenCards ?
                <HiddenCardHand count={cardCount} /> :
                cards.map((card, ind) => <PlayingCard key={ind} rank={card.value.toString()} suit={card.suit.toString()}/>)
            }
        </Flex>
    )
}

export default Player;