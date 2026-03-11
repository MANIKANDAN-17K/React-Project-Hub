import { useState } from "react";
function ideaForm({addIdea}){
    const [text,setText] = useState("")
    function handleSubmit(e){
        e.preventDefault()
        addIdea(text);
        setText("");
    }
    return(
        <form onSubmit={handleSubmit}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter startup idea" />
            <button type = "submit">add idea</button>
        </form>
    )
}

export default ideaForm