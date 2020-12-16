import React, { Component } from 'react';
// import Login from "./Login";
import OutputSearch from "./outputSearch";

import Spotify from "spotify-web-api-js";

import "./App.css"

const SpotifyWebApi = new Spotify();

// const login = new Login()

// const params = login.getAccessToken()
class Search extends Component {
   
    constructor(props){
        // params = this.props
        super(props);
        // SpotifyWebApi.setAccessToken(params)
        this.state={
            searchInput: "",
            searchArray: [],
            params: this.props.access_token
        }
    }
    componentDidMount(){
        // axios.get("https://jukeberry-api.herokuapp.com/api/home")
        // .then(res => {
        //     params = res.data
        // })
        // .catch(err=>console.error(err))
    }
    getSearch = event =>{
        event.preventDefault();
        SpotifyWebApi.searchTracks(this.state.searchInput)
        .then(res => {            
            this.setState({
                searchArray: res.tracks.items
            })
        }).catch(e=>console.log(e))
    }
    getToken=()=>{
        // SpotifyWebApi.setAccessToken(this.state.params)
    }
    getSearchValue=(e)=>{
        this.setState({searchInput: e.target.value })
    }
    render() {
        return (
            <div className="search-display">
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
                    <OutputSearch results={this.state.searchArray} room_code={this.props.room_code}></OutputSearch>
            </div>
        );
    }
}

export default Search;