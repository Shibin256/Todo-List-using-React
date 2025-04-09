import React, { useEffect, useState ,useRef} from "react";
import axios from 'axios'

function Create() {
    const [task, setTask] = useState()
    const inputRef=useRef(0)


    useEffect(()=>{                      // added foucs using useRef
        inputRef.current.focus()
    },[])
    
    const handleAdd = () => {
        if (task ) {
            axios.post('/local/add', { task: task})
                .then(result => {
                    location.reload()           //reload automatically
                }).catch(err => console.log(err))
        }
    }

    return (
        <div>
            <input type="text" placeholder="Write the Content.." ref={inputRef} onChange={(e) => { setTask(e.target.value.trim()) }} />         
            <button type="button" onClick={handleAdd}>submit</button>
        </div>
    )
}

export default Create