import React, { useState } from "react";
import axios from 'axios'

function Create(){
    const [task,setTask]=useState()
    const handleAdd=()=>{
            axios.post('http://localhost:1012/add',{task:task})
            .then(result=> {
                location.reload()
            })
            .catch(err=>console.log(err))
    }
    return(
        <div>
        <input type="text" placeholder="What is next task broh.." onChange={(e)=>{setTask(e.target.value)}} />
        <button type="button" onClick={handleAdd}>submit</button>
        </div>
    )
}

export default Create