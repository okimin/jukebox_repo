import React, { Component } from "react"
import "./App.css";
// import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";

import Search from "./Search";

import QueueComponent from "./QueueComponent";
// import App from './App'
import axios from "axios";

const SpotifyWebApi = new Spotify();
// const params = login.getToken()
// 
class Room extends Component {
    _isMounted= false;
    constructor(props){
        super(props);
        
        // const results = this.MakeRoom()     
        console.log(SpotifyWebApi.getAccessToken());   
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
            roomCode:"", //room code 
            token:"" // Accesstoken
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
        // SpotifyWebApi.setAccessToken(params);
        this._isMounted = true
        this.getItemsPlaying();
        this.getUser();
        this.getRoom();
        setInterval(this.getItemsPlaying,3000);
        setInterval(this.getUser,3000);
        var temptoken = SpotifyWebApi.getAccessToken();
        console.log(temptoken);

    }

    componentWillUnmount(){
        this._isMounted = false;
        this.setState({roomCode:""})
        this.setState({token:""})
        // console.log("unmounted")
    }

    //GETS THE ROOM CODE IN THE URL 
    getHashURLCode() {
        var q = window.location.hash.substring(1);        
        return q;
    }

    //GETS ALL THE INFORMATION FROM THE ROOM USING THE ROOM CODE TO  
    getRoom = () => {
        var codeLink = this.getHashURLCode();
        axios.get('https://jukeberry-api.herokuapp.com/api/home')
        .then(res=>{
            if(this._isMounted && codeLink!==""){
                var roomInfo = res.data  
                console.log(roomInfo)
                for(var i=0; i<roomInfo.length;i++){
                    if(roomInfo[i].code.includes(codeLink)){
                        this.setState({token:roomInfo[i].access_token})
                        // console.log(roomInfo[i].access_token)
                        SpotifyWebApi.setAccessToken(roomInfo[i].access_token)
                        // ())
                        this.setState({roomCode: roomInfo[i].code})
                    }
                }         
            }
        })
        .catch(err=>console.error(err))
    }
    //GETS THE CURRENT PLAYING SONG 
    getItemsPlaying = () =>{        
        SpotifyWebApi.getMyCurrentPlayingTrack()
        .then((res) => { 
            if(this._isMounted){
                console.log(res)
                //RETRIEVES NAME, IMAGE AND ARTST FOR PARAMETERS
            this.setState({
                nowPlaying:{
                    playName:res.item.name,
                    playImage:res.item.album.images[0].url,
                    playArtist:res.item.artists[0].name                   
                }
            })
            
            }
        })
        .catch(e=>{console.log(e)})
    }
    //SEARC SONG METHODS 
    SearchSongButton = () =>{
        this.setState({show: !this.state.show})
        // console.log(this.state.show)
    }
    showSearchResults =() => {
        if(this.state.show){
            return(
                <Search access_token ={this.state.token}/>
            )
        }
    }
    //TOGGLE AND MODIFY SONG/QUEUE
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
        if(this._isMounted){
            SpotifyWebApi.getMe()
            .then(res=>{
                // console.log(res)
                if(this._isMounted){
                this.setState({
                    user:{
                        name:res.display_name,
                        profileImage:res.images[0].url,
                        // email:res.item.artists[0].name               
                    }                
                })
                }            
            })
            .catch(err => {console.log(err)})
        }
    }    
    render(){
        return(
            <React.Fragment>
                <div className="room-css">
                    {/* <Login/>                             */}
                    <p className='room-code'>Room Code: {this.state.roomCode}</p>
                        <div className="currently-playing">
                        <div className="tracks"> 
                            <div>
                            <img src={this.state.nowPlaying.playImage} className="album" alt="album-cover"/>
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
                              Host:  <img src={this.state.user.profileImage} alt="host" className ="user-profile"/>
                              Guests:
                              <div>
                                  <ul>
                                      <li></li>
                                  </ul>
                              </div>
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