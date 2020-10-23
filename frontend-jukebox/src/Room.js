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

const queues = new queue()
const app = new App()
const login = new Login()
const SpotifyWebApi = new Spotify();
const params = login.getToken()

class Room extends Component {
    constructor(props){
        super(props);
        
        const results = this.MakeRoom()
        this.state={
            nowPlaying:{
                playName: 'not checked',
                playImage:'',
                playArtist:''
            },
            show: false,
            queueArray:[],
            songState:true,
            roomCode:results
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
        setInterval(this.getItemsPlaying,3000);
    }

    MakeRoom =()=>{
        var results =''
        var char ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        var charactersLength = char.length;
        for ( var i = 0; i < 6; i++ ) {
           results += char.charAt(Math.floor(Math.random() * charactersLength));
        }
        // this.setState({roomCode: results})
        // console.log(results)
        return results
      }
      getRoom=()=>{
        console.log(this.state.roomCode)
        return this.state.roomCode;
      }
    getItemsPlaying = () =>{        
        SpotifyWebApi.getMyCurrentPlayingTrack()
        .then((res) =>  
            this.setState({
                nowPlaying:{
                  playName:res.item.name,
                  playImage:res.item.album.images[0].url,
                  playArtist:res.item.artists[0].name
                }
            })
        ).catch(e=>{console.log(e)})

       
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
    nextSong=()=>{
        SpotifyWebApi.skipToNext()
        this.getItemsPlaying()
    }
    previousSong=()=>{
        SpotifyWebApi.skipToPrevious()
        this.getItemsPlaying()
    }
    pauseSong=()=>{
        if(this.state.songState){
            SpotifyWebApi.pause()
            this.setState({songState:!this.state.songState})
        }
        else {
            SpotifyWebApi.play()
            this.setState({songState:!this.state.songState})
        }
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
                            <QueueComponent></QueueComponent>
                        </div>
                    </div>                 
                </div>
            </React.Fragment>
        );
    }
}
export default Room;