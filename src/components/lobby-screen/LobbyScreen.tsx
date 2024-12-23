import { Button, Flex } from "@radix-ui/themes";
import useGameStore from "../../hooks/zustand";
import { useShallow } from "zustand/shallow";
import { Text } from "@radix-ui/themes";

function LobbyScreen() {
  const [pids, readyPids, send] = useGameStore(
    useShallow((state) => [state.pids, state.readyPids, state.send])
  );

  const myPid = pids[0];

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
        {myPid} - {readyPids[myPid] != undefined ? "READY" : "NOT READY"}
      </Text>
      <Text>Ready Players:</Text>
      {pids
        .filter((pid) => readyPids[pid] != undefined)
        .map((pid) => (
          <Text key={pid}>{pid}</Text>
        ))}
      <Text>Not Ready Players:</Text>
      {pids
        .filter((pid) => readyPids[pid] == undefined)
        .map((pid) => (
          <Text key={pid}>{pid}</Text>
        ))}
    </Flex>
  );
}

export default LobbyScreen;
