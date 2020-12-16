import React from 'react';
import {useHistory} from "react-router-dom"
import axios from "axios"
function Back(props) {

    const history = useHistory()
    const changeUrl = () =>{

        // console.log(props.name);
       
        // axios.get(`https://jukeberry-api.herokuapp.com/api/user/${props.roomCode}/${props.username}/delete/`)
        // .then(res=>{console.log(res);})
        // .catch(err=>console.error(err))
        
        // console.log(data.room_code);
        axios.delete(`https://jukeberry-api.herokuapp.com/api/user`,{
            params:{
                room_code:props.roomCode,
                name:props.username,
               
            }
        })
        .then(res=>{console.log(res);})
        .catch(err=>console.error(err))
        
        history.push("/")

    }
    return (
        <div>
            <button onClick={()=>changeUrl()}>Go Back</button>
        </div>
    );
}

export default Back;