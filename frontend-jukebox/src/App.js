import React, { Component } from 'react';
import {Link} from "react-router-dom"
import './App.css';
import axios from 'axios';

class App extends Component {

    constructor(props){
      super(props);
      this.state={
        roomCode:"",
        roomIndex:0,
        roomMade: false
      }
    }
    createRoom = ()=> {
      console.log("This will create a new room woohoo")
      /// Get input for Host Name and number of users needs
      /// Create a random 6 digit room code
      var results =''
      var char ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      var charactersLength = char.length;
      for ( var i = 0; i < 6; i++ ) {
         results += char.charAt(Math.floor(Math.random() * charactersLength));
      }
      axios
      .post('https://jukeberry-api.herokuapp.com/api/home', 
      {
        roomID: results,
        host: results,
        votes_to_skip: 1,
      })
      .then(
        res => {
          // console.log(res)
          var data = res.data
          this.setState({roomIndex:data.length})
      }
      )
      .catch(err=>console.error(err))
      this.setState({roomMade:true})
    } 
    getRoomStatus=()=>{
      return this.state.roomMade;
    }
    getRoomIndex=()=>{
      return this.state.roomIndex;
    }
    handleRoomCode =(e)=>{
      this.setState({roomCode: e.target.value })
    }
    handleSubmit = (e)=>{
      e.preventDefault()
      console.log("Entering Room")
      // Request passcode and enter the correct room
      // Make a GET request to enter that shit
      // start adding songs!
      axios.get("https://jukeberry-api.herokuapp.com/api/home")
      .then(res => {
        var data = res.data
        console.log(data)
        for (var i=0;i<data.length;i++){
          if(data[i].roomID===this.state.roomCode){
            console.log("Found room!",i)
            this.setState({roomIndex:i})
            return 
          }
        }
        window.alert("Room was not found\n try again or mayb a different code")
        // console.log("room not found")
      })
    }

 render(){ 
   return (
    <div className="App-bg">
     
      <div className="options">
        <Link to="/Room">
          <button onClick={this.createRoom}>Make A Room</button>
        </Link>  
        <form onSubmit={this.handleSubmit}>
          <label>Join Room</label><br/>
          <input 
            type="text"
            id="room-search" 
            name="search-box" 
            value={this.state.roomCode}
            onChange={this.handleRoomCode}
            />
          <Link to="/Room">
            <button>Enter room</button>
          </Link>
        </form>
        
        
      </div>

    </div>
  );
}
}

export default App;
