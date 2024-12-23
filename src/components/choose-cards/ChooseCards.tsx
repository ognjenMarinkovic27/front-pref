import { Button, Flex, Text } from "@radix-ui/themes";
import CardHand from "../card-hand/CardHand";
import useGameStore from "../../hooks/zustand";
import { useShallow } from "zustand/shallow";
import Card from "../../types/card";

function ChooseCards() {
  const [myTurn, current, hiddenCards, pickCard, send] = useGameStore(
    useShallow((state) => [
      state.handState.currentPlayerPid == state.pids[0],
      state.handState.currentPlayerPid,
      state.handState.hiddenCards,
      state.pickCard,
      state.send,
    ])
  );

  function handleClick(card: Card) {
    pickCard(card);
  }

  function handleSubmit() {
    send({
      type: "choose-discard",
      payload: {
        cards: hiddenCards,
      },
      seq: 0,
    });
  }

  return (
    <Flex direction="column" align="center" gap="3" mt="auto">
      <Text>{current} is choosing cards</Text>
      <CardHand
        cards={hiddenCards}
        onClick={myTurn ? handleClick : undefined}
      />
      {myTurn ? <Button onClick={handleSubmit}>Ok</Button> : <></>}
    </Flex>
  );
}

export default ChooseCards;
