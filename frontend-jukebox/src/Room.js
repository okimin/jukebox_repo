import React, { Component } from "react"
import "./App.css";
// import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";

import Search from "./Search";

import QueueComponent from "./QueueComponent";
import Guests from "./Guests"
import axios from "axios";
import logo from "./images/JukeBoxLogo.png"
// import { useHistory } from "react-router-dom";
import Back from "./Back";

const SpotifyWebApi = new Spotify();
// 

class Room extends Component {
    _isMounted= false;
    constructor(props){
        super(props);
        

        this.state={

            nowPlaying:{
                playName: 'start your device',
                playImage:'',
                playArtist:'',
                playUri:''
            },
            user:{
                name:"hi",
                inRoom:true,
                profileImage:"",

            },
            show: false,
            songState:false,
            roomCode:this.props.match.params.id, //room code 
            token:"", // Accesstoken
            username:this.props.match.params.user,
            searchButton:"Search Song",
            skipVote:0,
            guests:[],
            songs:[]
        }

        // this.getNowPlaying = this.getNowPlaying.bind(this);
        this.getItemsPlaying = this.getItemsPlaying.bind(this);
        this.SearchSongButton = this.SearchSongButton.bind(this);
        this.showSearchResults = this.showSearchResults.bind(this);
        this.nextSong =this.nextSong.bind(this)
        this.previousSong =this.previousSong.bind(this);
        this.pauseSong =this.pauseSong.bind(this);
        this.makePlaylist = this.makePlaylist.bind(this);
    }
   
    componentDidMount(){
        this._isMounted = true
        this.getRoom();
        this.getItemsPlaying();        
        this.makePlaylist();

        setInterval(this.getRoom,2000);
        setInterval(this.getItemsPlaying,2000);
        setInterval(this.getUser,2000);
        setInterval(this.makePlaylist,2000)

    }
    componentDidUpdate(){
    }
    componentWillUnmount(){
        // window.onbeforeunload = (e) => {
        //     this.setState({
        //         nowPlaying:{
        //             playuri:this.state.nowPlaying.playUri}})
        //     };
        this._isMounted = false;
        this.setState({roomCode:""})

        axios.delete(`https://jukeberry-api.herokuapp.com/api/user`,{
            params:{
                room_code:this.state.roomCode,
                name:this.state.username,
               
            }
        })
        .then(res=>{console.log(res);})
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
        // gets the token from the backend and connects spotify 
        SpotifyWebApi.setAccessToken(this.state.token)

        axios.get('https://jukeberry-api.herokuapp.com/api/viewroom',{
            params:{
                room_code:this.state.roomCode
            }
        })
        .then(res=>{
            if(this._isMounted){
                var roomInfo = res.data  
                this.setState({token:roomInfo.access_token})       
        }
        })
        .catch(err=>console.error(err))
    }
    loadSpotify=()=>{
        SpotifyWebApi.setAccessToken(this.state.token)
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
            if(this._isMounted && res.is_playing){
            if(res.item.uri!==this.state.nowPlaying.playUri 
                && this.state.nowPlaying.playUri!=="")
            {

                SpotifyWebApi.pause();
                if (this.state.songs.length>0){
                    
                    SpotifyWebApi.queue(this.state.songs[0].song_id)
  
                    axios.delete('https://jukeberry-api.herokuapp.com/api/song',{
                    params:{
                        song_id:this.state.songs[0].song_id,
                        room_code:this.state.songs[0].room_code
                    }
                })
                .then(res=>{
                    this.setState({songs:res.data})
                })
                SpotifyWebApi.skipToNext()
                .then(res=>{console.log(res);})
                }
                SpotifyWebApi.play();
            }
            this.setState({
                nowPlaying:{
                    playName:res.item.name,
                    playImage:res.item.album.images[0].url,
                    playArtist:res.item.artists[0].name,
                    playUri:res.item.uri                   
                },
                songState:true
            })
            }
            else{this.setState({songState:false})}
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
    }
    showSearchResults =() => {
        if(this.state.show){
            return(
                <Search access_token ={this.state.token} room_code={this.state.roomCode}/>
            )
        }
    }
    updateSongs=(songArray)=>{
        this.setState({songs:songArray})
    }
    updateGuests=(guestArray)=>{
        this.setState({guests:guestArray})
    }
    //TOGGLE AND MODIFY SONG/QUEUE 
    //modifies the skip song feature
    nextSong = () => {
        SpotifyWebApi.skipToNext()
        if(this.state.skipVote > this.state.guests.length/2-1){
        if (this.state.songs.length>0){
            SpotifyWebApi.queue(this.state.songs[0].song_id)
            axios.delete('https://jukeberry-api.herokuapp.com/api/song',{
            params:{
                song_id:this.state.songs[0].song_id,
                room_code:this.state.songs[0].room_code
            }
        })
        .then(res=>{
            console.log(res);
            this.setState({songs:res.data})
        })
    }
            
            this.getItemsPlaying()
            this.setState({skipVote:0})
            this.setState({songState:true})
            
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
                if(this._isMounted){
                this.setState({
                    user:{
                        name:res.display_name,
                        profileImage:res.images[0].url,
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
                    <div className='room-header'>
                    <div className="column-logo room-logo">       
                        <img src={logo} width="60px" alt="logo"/>
                        <h2 className="title">JukeBerry</h2> 
                    </div>
                    <div className='room-code'>
                        <h4>Room Codes: {this.state.roomCode}</h4>
                    </div>
                    <Back username={this.state.username} roomCode={this.state.roomCode} guests={this.state.guests}></Back>
                    </div>
        
                        <div className="currently-playing">
                        <div className="tracks"> 
                            <div>
                                <img src={this.state.nowPlaying.playImage} className="album" alt="album-cover"/>
                            </div>
                            <h2 className="current-text">{this.state.nowPlaying.playName}</h2>
                            <h4 className="current-text">{this.state.nowPlaying.playArtist}</h4>
                        </div>
                        <div className='controllers'>    
                            <button onClick={this.pauseSong}> {this.state.songState ? "pause" : "play"} </button>
                            <button onClick={this.nextSong}> Next </button>
                        </div>
                        <button onClick={()=>this.SearchSongButton()}>{this.state.searchButton}</button>
                        <h4>Votes to skip current song: {this.state.skipVote} / {this.state.guests.length}</h4>
                        <div className="container">
                            {this.showSearchResults()}
                            <div className="users-tab">
                              Host:  <img src={this.state.user.profileImage} alt="host" className ="user-profile"/>
                              <br/>
                              You: {this.state.username}
                              <br/>
                        
                            <Guests 
                                skipVote={this.state.skipVote} 
                                guests={this.state.guests} 
                                update={this.updateGuests.bind(this)}
                            />
                            </div>
                            <QueueComponent 
                                access_token ={this.state.token} 
                                songs={this.state.songs} 
                                room_code={this.state.roomCode} 
                                update={this.updateSongs.bind(this)}/>

                        </div>
                    </div>                 
                </div>
            </React.Fragment>
        );
    }
}
export default Room;