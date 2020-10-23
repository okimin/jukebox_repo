import React, { Component } from 'react';
import Login from "./Login";
import OutputSearch from "./outputSearch";

import Spotify from "spotify-web-api-js";

import "./App.css"

const SpotifyWebApi = new Spotify();
const login = new Login()

const params = login.getToken()
class Search extends Component {
    constructor(props){
        super(props);
        SpotifyWebApi.setAccessToken(params)
        this.state={
            searchInput: "",
            searchArray: []
        }
    }
    getSearch = event =>{
        event.preventDefault();
        SpotifyWebApi.searchTracks(this.state.searchInput)
        .then(res => {
            
            this.setState({
                searchArray: res.tracks.items
            })

            // console.log(newJson)}
        }).catch(e=>console.log(e))

    }
    setSearchValue=(e)=>{
        
    }
    getToken=()=>{
        SpotifyWebApi.setAccessToken(params)

    }
    getSearchValue=(e)=>{
        this.setState({searchInput: e.target.value })
    }
    render() {
        return (
            <div className="search-display">
                {this.getToken()}
                {/* {this.getSearch()} */}
                <form className="search-songs" onSubmit={this.getSearch}>
                    <label> Search Song </label>
                    <input 
                        type="text" 
                        id="search" 
                        name="search-box" 
                        value={this.state.searchInput}
                        onChange={this.getSearchValue}
                    />
                    <input type="submit" id="search" className="btn btn-primary" value="Search" ></input>

                </form>
                    <OutputSearch results={this.state.searchArray} ></OutputSearch>

                
            </div>
        );
    }
}

export default Search;