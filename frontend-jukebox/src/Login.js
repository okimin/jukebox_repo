import React, { Component } from 'react';
import Spotify from "spotify-web-api-js"
// import Room from "./Room"
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
            token: token,
        
        }        
    };

    checkLogin(){        
        return this.token? true: false
    }
    getToken=()=>{
        // console.log(this.state.token)
        return this.state.token;
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
        return hashParams;
    }
      
    render() {
        return (
            <div>
                <a href='http://localhost:8888' >
                    Login to Spotify 
                </a>
            </div>
        );
    }
}

export default Login;