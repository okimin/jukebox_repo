import React, { Component } from 'react';
import Spotify from "spotify-web-api-js"
// import Room from "./Room"
import spotifyBtn from "./images/spotify-btn.png"
const SpotifyWebApi = new Spotify();


class Login extends Component {
    constructor(props){
        super(props); 
        const params = this.getHashParams();
        const token = params.access_token;
        if(token){
            SpotifyWebApi.setAccessToken(params.access_token)
        }
        this.state={
            loggedIn: token? true: false,            
            accessToken: token,
            refreshToken: params.refresh_token
        }        
    };

    checkLogin(){        
        return this.token? true: false
    }
    getAccessToken=()=>{
        // console.log(this.state.token)
        return this.state.accessToken;
    }
    getRefreshToken=()=>{
        return this.state.refreshToken;
    }
    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
            
        e = r.exec(q)
        while (e ) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q)
        }
        this.setState({loggedIn: true})
        // console.log(this.state.loggedIn)
        return hashParams;
    }
      
    render() {
        return (
            <div className="login-btn">
               
                {this.state.loggedIn && 
                    <h3>Logged in!</h3>
                }
                 {/* <a href='https://juekbox-auth.herokuapp.com/login' > */}
                    <a href='http://localhost:8888/login' >
                 
                    <div style={{padding: "10px"}}>Login to Spotify </div>
               
                    <img src= {spotifyBtn} width="10%" className="spotify Login" alt="login-btn"></img>
                </a>

            </div>
        );
    }
}

export default Login;