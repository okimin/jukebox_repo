import React, { Component } from "react"
import "./App.css";
// import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";

import Login from "./Login"
import Queue from "./QueueComponent";
import Search from "./Search";
import queue from "./Queue";
import Async from 'react-async';
import QueueComponent from "./QueueComponent";
import App from './App'
import axios from "axios";

const queues = new queue()
const app = new App()
const login = new Login()
const SpotifyWebApi = new Spotify();
const params = login.getToken()

class Room extends Component {
    constructor(props){
        super(props);
        
        // const results = this.MakeRoom()

        
        this.state={

            nowPlaying:{
                playName: 'not checked',
                playImage:'',
                playArtist:''
            },
            user:{
                name:"hi",
                inRoom:true,
                profileImage:"",
                // email:""

            },
            show: false,
            queueArray:[],
            songState:true,
            roomCode:""
        }

      
        // this.getNowPlaying = this.getNowPlaying.bind(this);
        this.getItemsPlaying = this.getItemsPlaying.bind(this);
        this.SearchSongButton = this.SearchSongButton.bind(this);
        this.showSearchResults = this.showSearchResults.bind(this);
        this.nextSong =this.nextSong.bind(this)
        this.previousSong =this.previousSong.bind(this);
        this.pauseSong =this.pauseSong.bind(this);
    }
   
    componentDidMount(){
        SpotifyWebApi.setAccessToken(params);
        this.getItemsPlaying();
        this.getUser();
        this.getRoom();
        setInterval(this.getItemsPlaying,3000);
        setInterval(this.getUser,3000);

    }

    getRoom = () => {
        // var temp 
        var index =app.getRoomIndex();
        console.log(index)
        
        axios.get('https://jukeberry-api.herokuapp.com/api/home')
        .then(res=>{
            console.log(res)
            var roomInfo = res.data
           
            this.setState({roomCode: roomInfo[index].roomID})
            // temp=roomInfo[roomInfo.length-1].roomID
        })
        .catch(err=>console.error(err))
        // console.log(temp)
        // return temp
    }
    getItemsPlaying = () =>{        
        SpotifyWebApi.getMyCurrentPlayingTrack()
        .then((res) => { 
            this.setState({
                nowPlaying:{
                    playName:res.item.name,
                    playImage:res.item.album.images[0].url,
                    playArtist:res.item.artists[0].name   
                
                }
            })
        })
        .catch(e=>{console.log(e)})

       
    }
    SearchSongButton = () =>{
        this.setState({show: !this.state.show})
        // console.log(this.state.show)
    }
    showSearchResults =() => {
        if(this.state.show){
            return(
                <Search/>
            )
        }
    }
    nextSong = () => {
        SpotifyWebApi.skipToNext()
        this.getItemsPlaying()
    }
    previousSong = () => {
        SpotifyWebApi.skipToPrevious()
        this.getItemsPlaying()
    }
    pauseSong = () => {
        if(this.state.songState){
            SpotifyWebApi.pause()
            this.setState({songState:!this.state.songState})
        }
        else {
            SpotifyWebApi.play()
            this.setState({songState:!this.state.songState})
        }
    }
    getUser =() => {
        SpotifyWebApi.getMe()
        .then(res=>{
            // console.log(res)
            this.setState({
                user:{
                    name:res.display_name,
                    profileImage:res.images[0].url,
                    // email:res.item.artists[0].name               
                }                
            })
            
        })
        .catch(err => {console.log(err)})
    }    
    render(){
        return(
            <React.Fragment>
                <div className="room-css">
                    <Login/>                            
                    <p className='room-code'> {this.state.roomCode}</p>
                        <div className="currently-playing">
                        <div className="tracks"> 
                            <div>
                            <img src={this.state.nowPlaying.playImage} className="album" alt="album cover"/>
                            </div>
                            <h2 className="current-text">{this.state.nowPlaying.playName}</h2>
                            <h4 className="current-text">{this.state.nowPlaying.playArtist}</h4>
                        </div>
                        <div className='controllers'>    
                            <button onClick={this.previousSong}> prev </button>
                            <button onClick={this.pauseSong}> pause </button>
                            <button onClick={this.nextSong}> next </button>
                        </div>
                        <button onClick={()=>this.SearchSongButton()}>Search Song</button>
                        <div className="container">
                            {this.showSearchResults()}
                            <div className="users-tab">
                                <img src={this.state.user.profileImage} className ="user-profile"/>
                            </div>
                            <QueueComponent></QueueComponent>
                        </div>
                    </div>                 
                </div>
            </React.Fragment>
        );
    }
}
export default Room;