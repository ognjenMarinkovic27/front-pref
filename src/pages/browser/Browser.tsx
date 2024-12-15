import { Link } from "react-router"
import { Text, TextField } from "@radix-ui/themes"
import { useState } from "react"

function Browser() {
    const [name, setName] = useState('')
    const setPidInStore = useGameStore(state => state.setPid)

    return (
        <>
            <TextField.Root value={name} placeholder="Choose a name" onChange={e => setName(e.target.value)}/>
            <Link to='/game' onClick={_ => setPidInStore(name)}>Connect</Link>
        </>
    )
}
import useGameStore from "../../hooks/zustand"

export default Browser