import { Button, Flex } from "@radix-ui/themes";
import useGameStore from "../../hooks/zustand";
import { useShallow } from "zustand/shallow";
import { Text } from "@radix-ui/themes";

function LobbyScreen() {
  const [pid, otherPids, readyPids, send] = useGameStore(
    useShallow((state) => [
      state.pid,
      state.otherPids,
      state.readyPids,
      state.send,
    ])
  );

  function handleReadyClick() {
    send({
      type: "ready",
      seq: 0,
      payload: {
        readyPid: "",
      },
    });
  }

  return (
    <Flex direction="column">
      <Button onClick={handleReadyClick}>Ready</Button>
      <Text>
        {pid} - {readyPids[pid] != undefined ? "READY" : "NOT READY"}
      </Text>
      <Text>Ready Players:</Text>
      {otherPids
        .filter((pid) => readyPids[pid] != undefined)
        .map((pid) => (
          <Text key={pid}>{pid}</Text>
        ))}
      <Text>Not Ready Players:</Text>
      {otherPids
        .filter((pid) => readyPids[pid] == undefined)
        .map((pid) => (
          <Text key={pid}>{pid}</Text>
        ))}
    </Flex>
  );
}

export default LobbyScreen;
