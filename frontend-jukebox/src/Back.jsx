import React from 'react';
import {useHistory} from "react-router-dom"
function Back(props) {
    const history = useHistory()
    const changeUrl = () =>{

        console.log("hello");
        history.push("/")
    }
    return (
        <div>
            <button onClick={changeUrl}>Go Back</button>
        </div>
    );
}

export default Back;