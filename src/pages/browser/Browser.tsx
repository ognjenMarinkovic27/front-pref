import { Link } from "react-router";
import { TextField } from "@radix-ui/themes";
import { useState } from "react";

function Browser() {
  const [name, setName] = useState(makeid(7));
  const setPids = useGameStore((state) => state.setPids);

  return (
    <>
      <TextField.Root
        value={name}
        placeholder="Choose a name"
        onChange={(e) => setName(e.target.value)}
      />
      <Link to="/game" onClick={(_) => setPids([name])}>
        Connect
      </Link>
    </>
  );
}
import useGameStore from "../../hooks/zustand";
import { makeid } from "../../utils/id";

export default Browser;
