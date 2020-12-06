import React, { Component } from 'react';
import {Link} from "react-router-dom"
import './App.css';
import axios from 'axios';
import Login from './Login';


const login = new Login()
const params = login.getAccessToken()
const refresh = login.getRefreshToken()
class App extends Component {

    constructor(props){
      super(props);
      this.state={
        roomCode:"#",
        // roomIndex:0,
        roomMade: false,
        username:""
      }
    }
    componentWillUnmount(){
      this.setState({roomMade:"#"})
    }
    makeRoom= () => { 
      if(this.state.username ===""){
        window.alert("enter a username")
        return;
      }
      if(params === undefined) {
        window.alert("You must login to spotify first if you are making a new room")
        return;
      }

      var results ='#'
      var char ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      var charactersLength = char.length;
      for ( var i = 0; i < 6; i++ ) {
         results += char.charAt(Math.floor(Math.random() * charactersLength));
      }
      axios
      .post('https://jukeberry-api.herokuapp.com/api/home', 
      {
        code: results,
        host: results,
        votes_to_skip: 0,
        access_token: params,
        host_name:this.state.username,
        refresh_token:refresh
      })
      .then(
        res => {
          console.log("part1")
          this.setState({roomCode:results})
          axios.get("https://jukeberry-api.herokuapp.com/api/home")
        .then(res => {
          var data = res.data
          // console.log(this.state.roomCode)
          for (var i=0;i<data.length;i++){
            // console.log(data);
            if(data[i].host.includes(this.state.roomCode)){
              // console.log("Found room!",i)
              this.setState({roomState:true})
              // console.log(data[i].host)
              data[i].guests.push(this.state.username)
              console.log(data[i].guests);
              return 
            }
            else{console.log("no");}
          }
          window.alert("Room was not found\n try again or maybe a different code")
          // console.log("room not found")
        })
      }
      )
      .then(()=>{ 
        console.log("success")
        window.location.href=`/Room/${this.state.roomCode}`
      }
      )
      .catch(err=>console.error(err))
      
    }
    // IF ROOM WAS MADE
    getRoomStatus=()=>{
      return this.state.roomMade;
    }
    getRoomIndex=()=>{
      return this.state.roomIndex;
    }
    //ROOMCODE 
    handleRoomCode =(e)=>{
      this.setState({roomCode: e.target.value })
    }
    handleSubmit = (e)=>{
      e.preventDefault()
      console.log("Entering Room")
      // Request passcode and enter the correct room
      // Make a GET request to enter that shit
      // start adding songs!
      if(this.state.username !==""){
        
        axios.get("https://jukeberry-api.herokuapp.com/api/home")
        .then(res => {
          var data = res.data
          for (var i=0;i<data.length;i++){
            //SEARCHES FOR ROOM 
            if(data[i].code.includes(this.state.roomCode)){
              // console.log("Found room!",i)
              this.setState({roomState:true})
              // console.log(data[i].host)
              // data[i].guests.push(this.state.username)
              if(!this.state.roomMade){
                console.log("adding to room");
                axios.post("https://jukeberry-api.herokuapp.com/api/adduser",{
                name:this.state.username,
                songs_added: 0,
                room_code:this.state.roomCode
                })
                .then(res=> console.log(res))
                .catch(err=> console.error(err))
              }
              console.log(data[i].guests);
              return 
            }
            // else{console.log("no");}
          }
          window.alert("Room was not found\n try again or maybe a different code")
          // console.log("room not found")
        })
      }
      else{
        window.alert("enter username")
      }
    }
  handleUserName =(e)=>{
    this.setState({username:e.target.value})
  }
  render(){ 
   return (
    <div className="App-bg">
      <div className="login">      
    
     <form className="nickname-form">
          <label>Nickname</label><br/>
          <input 
            type="text"
            id="user-name" 
            name="username-box" 
            value={this.state.username}
            onChange={this.handleUserName}
            />
        </form>
      <button onClick={this.makeRoom} className="btn makeRoom-btn">Make A Room</button>          
      {/* <div className="options"> */}
        <form onSubmit={this.handleSubmit}>
          <label>Join Room</label><br/>
          <input 
            type="text"
            id="room-search" 
            name="search-box" 
            value={this.state.roomCode}
            onChange={this.handleRoomCode}
            />
            <br/>
            <button>Search for Room</button>          
        </form>
     
      {/* </div>   */}
      <Login />  
      
      {this.state.roomState &&        
      <Link to={`/Room/${this.state.roomCode}`}>
        <button className="btn enter-btn" onClick ={this.enterRoom}>Enter room</button>
      </Link>        
      }</div> 
    </div>
  );
}
}

export default App;
