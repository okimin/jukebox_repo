import React, { Component } from "react"
import "./App.css";
// import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";

import Search from "./Search";

import QueueComponent from "./QueueComponent";
// import App from './App'
import axios from "axios";
import logo from "./images/JukeBoxLogo.png"
// import { useHistory } from "react-router-dom";
import Back from "./Back";
const SpotifyWebApi = new Spotify();
// const params = login.getToken()
// 

class Room extends Component {
    _isMounted= false;
    constructor(props){
        super(props);
        
        // const results = this.MakeRoom()     
        // console.log(SpotifyWebApi.getAccessToken());   
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
            token:"", // Accesstoken
            username:"",
            guests:[],
            searchButton:"Search Song",
            skipVote:0
        }

        // this.getNowPlaying = this.getNowPlaying.bind(this);
        this.getItemsPlaying = this.getItemsPlaying.bind(this);
        this.SearchSongButton = this.SearchSongButton.bind(this);
        this.showSearchResults = this.showSearchResults.bind(this);
        this.nextSong =this.nextSong.bind(this)
        this.previousSong =this.previousSong.bind(this);
        this.pauseSong =this.pauseSong.bind(this);
        this.makePlaylist = this.makePlaylist.bind(this)
    }
   
    componentDidMount(){
        // SpotifyWebApi.setAccessToken(params);
        this._isMounted = true
        this.getItemsPlaying();
        this.getUser();
        this.getRoom();
        this.makePlaylist();
        setInterval(this.getItemsPlaying,2000);
        setInterval(this.getUser,2000);
        setInterval(this.getRoom,2000);
        setInterval(this.makePlaylist,2000)
        // var temptoken = SpotifyWebApi.getAccessToken();
        // console.log(temptoken);

    }
    componentDidUpdate(){

    }
    componentWillUnmount(){
        this._isMounted = false;
        this.setState({roomCode:""})
        this.setState({token:""})
        // console.log("unmounted"

        axios.delete(
            `https://jukeberry-api.herokuapp.com/api/user
            ${this.state.roomCode}/${this.state.username}/delete`
            )
            .then(res =>{
                console.log(res)
            })
            .catch(err=>console.error(err))
        this.setState({username:""})
        // this.setState({guests:tempGuest})
    }

    //GETS THE ROOM CODE IN THE URL 
    getHashURLCode() {
        var q = window.location.hash.substring(1);        
        return q;
    }
    //GETS ALL THE INFORMATION FROM THE ROOM USING THE ROOM CODE TO  
    getRoom = () => {
        // console.log(match.params.roomCode);
        var codeLink = this.getHashURLCode();
        axios.get('https://jukeberry-api.herokuapp.com/api/home')
        .then(res=>{
            if(this._isMounted && codeLink!==""){
                var roomInfo = res.data  
                // console.log(roomInfo)
                for(var i=0; i<roomInfo.length;i++){
                    if(roomInfo[i].code.includes(codeLink)){
                        this.setState({token:roomInfo[i].access_token})
                        // console.log(roomInfo[i])
                        var tempGuest = roomInfo[i].guests
                        if(tempGuest.length <= 0){
                            this.setState({username: roomInfo[i].host_name})                            
                        }
                        else{
                            this.setState({guests: tempGuest})
                            this.setState({username: tempGuest[tempGuest.length-1]})
                        }
                        SpotifyWebApi.setAccessToken(roomInfo[i].access_token)
                        this.setState({roomCode: roomInfo[i].code})
                    }
                }         
            }
        })
        .catch(err=>console.error(err))
    }
    makePlaylist=()=>{
        // console.log("here")
        if(this._isMounted){
        // SpotifyWebApi.getMe()
        // .then(res=>{
        //     console.log(res)
        //     SpotifyWebApi.createPlaylist(res.id)
        //     .then(res=>{console.log("success");})
        //     .catch(err=>console.error(err))
        // })
        // .catch(err=>{console.error(err);})
        
        }
    }
    //GETS THE CURRENT PLAYING SONG 
    getItemsPlaying = () =>{        
        SpotifyWebApi.getMyCurrentPlayingTrack()
        .then((res) => { 
            if(this._isMounted){
                // console.log(res)
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
    //SEARCH SONG METHODS 
    SearchSongButton = () =>{
        this.setState({show: !this.state.show})
        if(this.state.searchButton ==="Search Song")
        this.setState({searchButton:"Hide search"})
        else{
            this.setState({searchButton:"Search Song"})
        }
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
    //modifies the skip song feature
    nextSong = () => {
        if(this.state.skipVote > this.state.guests.length/2-1){ 
            SpotifyWebApi.skipToNext()
            this.getItemsPlaying()
            this.setState({skipVote:0})
        }
        else{
            this.setState({skipVote:this.state.skipVote+1})
        }
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
                    <div className='room-header'>
                    <div className="column-logo room-logo">       
                        <img src={logo} width="60px" alt="logo"/>
                        <h2 className="title">JukeBerry</h2> 
                    </div>
                    <div className='room-code'>
                        <h4>Room Codes: {this.state.roomCode}</h4>
                    </div>
                    <Back username={this.state.username} roomCode={this.state.roomCode} guests={this.state.guests}></Back>
                    {/* <button onClick={this.goBack}> Go Back</button> */}
                    </div>
        
                        <div className="currently-playing">
                        <div className="tracks"> 
                            <div>
                                <img src={this.state.nowPlaying.playImage} className="album" alt="album-cover"/>
                            </div>
                            <h2 className="current-text">{this.state.nowPlaying.playName}</h2>
                            <h4 className="current-text">{this.state.nowPlaying.playArtist}</h4>
                        </div>
                        {/* <div></div> */}
                        <div className='controllers'>    
                            {/* <button onClick={this.previousSong}> prev </button> */}
                            <button onClick={this.pauseSong}> Pause </button>
                            <button onClick={this.nextSong}> Next </button>
                        </div>
                        <button onClick={()=>this.SearchSongButton()}>{this.state.searchButton}</button>
                        <div className="container">
        <h4>Votes to skip current song: {this.state.skipVote} / {this.state.guests.length}</h4>
                            {this.showSearchResults()}
                            <div className="users-tab">
                              Host:  <img src={this.state.user.profileImage} alt="host" className ="user-profile"/>
                              <br/>
                              You: {this.state.username}
                              <br/>
                              Guests:
                              {this.state.guests.map((guest,index)=>(
                                <div key={index}>{guest}</div> 
                              ))}
                              {/* <div>
                                  <ul>
                                      <li></li>
                                  </ul>
                              </div> */}
                            </div>
                            <QueueComponent access_token ={this.state.token}></QueueComponent>
                        </div>
                    </div>                 
                </div>
            </React.Fragment>
        );
    }
}
export default Room;