import React, { Component } from "react";

// import Login from "./Login";

// var Spotify = require('node-spotify-api');
import Spotify from "spotify-web-api-js"
import Search from "./Search";
require("dotenv").config();

// const client_id= process.env.REACT_APP_CLIENT_ID;
// const secret_key=process.env.REACT_APP_CLIENT_SECRET

 const SpotifyWebApi = new Spotify();


class User extends Component{
    constructor(props){
        super(props); 
        const params = this.getHashParams();
        const token= params.access_token;
        if(token){
            // console.log('yes!')
            SpotifyWebApi.setAccessToken(params.access_token)
        }
        this.state={
            loggedIn: token? true: false,
            nowPlaying:{
                playName: 'not checked',
                playImage:''
            }
        }
        
    };
     getHashParams() {
        // console.log("hi",this.token)
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e ) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q)
        }
        // console.log(hashParams)
        return hashParams;
      }
      getNowPlaying=()=>{
          SpotifyWebApi.getMyCurrentPlaybackState()
          .then((res) => {
              this.setState({
                  nowPlaying:{
                    playName:res.item.name,
                    playImage:res.item.album.images[0].url
                  }
              });
          })
      }

    render(){
        return(
            <React.Fragment>
        
            <Search></Search>
          
            </React.Fragment>
        );
    }
}
export default User;
