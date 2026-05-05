import React, { useState } from "react";

const Join = ({setUser}) =>{
    const [name, setName] = useState("");
    const [project, setProject] = useState("");
    const join= () =>{
        if(!name.trim()) return;
        setUser({name, project});
    }
    return(
    <div className="join-container">

        <h2>Join Project</h2>

        <input 
          className="join-input"
          placeholder="Enter User"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <input className="join-input" placeholder="Enter room" value = {project} 
            onChange={(e)=>setProject(e.target.value)} />

        <button className="join-btn" onClick={join}>
          Join Chat
        </button>

    </div>
)
}

export default Join;