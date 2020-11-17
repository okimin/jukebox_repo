import React, { Component } from 'react';
import {Link} from "react-router-dom"
import './App.css';
import axios from 'axios';

class App extends Component {

    createRoom = ()=> {
      console.log("This will create a new room woohoo")
      /// Get input for Host Name and number of users needs
      /// Create a random 6 digit room code
      axios
      .post('http://127.0.0.1:8000/api/home', {
        roomID: "2020",
        host: "CORONAVIRUS",
        votes_to_skip: 1,
      })
      .then(response => (this.info = response.data))


      console.log("Exiting room")
    } 

    handleSubmit = ()=>{
      console.log("Entering Room")
      // Request passcode and enter the correct room
      // Make a GET request to enter that shit
      // start adding songs!
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
          <input type="password"/>
        </form>
        
        
      </div>

    </div>
  );
}
}

export default App;
