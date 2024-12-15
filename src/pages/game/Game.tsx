import { Text } from "@radix-ui/themes";
import { useEffect } from "react";
import "./Game.css";
import useGameStore from "../../hooks/zustand";
import { useNavigate } from "react-router";
import PlayingBoard from "../../components/playing-board/PlayingBoard";
import { useShallow } from "zustand/shallow";
import useGameWebSocket from "../../hooks/game-web-socket";
import LobbyScreen from "../../components/lobby-screen/LobbyScreen";

function Game() {
  const [pid, started] = useGameStore(
    useShallow((state) => [state.pid, state.started])
  );

  const nav = useNavigate();

  useEffect(() => {
    if (pid == "") {
      nav("/");
    }
  }, []);

  const { loading } = useGameWebSocket(pid);

  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : !started ? (
        <LobbyScreen />
      ) : (
        <PlayingBoard />
      )}
    </>
  );
}

export default Game;
