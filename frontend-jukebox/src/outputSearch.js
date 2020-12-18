import React, { Component } from 'react';
// import Spotify from "spotify-web-api-js";
import axios from "axios"

// const SpotifyWebApi = new Spotify();

class outputSearch extends Component {
    constructor(props){
        super(props);
        this.state={
            track:{
                id:0,
                trackImage:"",
                trackName:"",
                trackURI:"",
                trackArtist:""
            }
        }
    }
    addToQueue =(uri,name,artist,image)=>{
        
        // console.log(uri,name,artist,image);
        // console.log(this.props.room_code);
        // console.log(name.length)
        axios.post("https://jukeberry-api.herokuapp.com/api/song", 
        {
                name:name,
                song_id:uri,
                song_pic:image,
                artist_id:artist,
                room_code:this.props.room_code
        })
        .then(res=>{
            // console.log("success");
        })
        .catch(err=>{console.error(err);})
    }


    render() {
        return (
            <div >
            {this.props.results.map( (result,index) =>(
                <div key={index} className="song-found">
                    <div className="search-list">
                        <div>
                            <img src={result.album.images[0].url} className="album album-search"alt= "album cover"/>
                            <h3 className='search-text'>{result.name}</h3> 
                            <h4 className='search-text'>{result.artists[0].name}</h4>
                        </div>
                    <button 
                    onClick={()=> {
                        
                        this.addToQueue(result.uri,result.name,result.artists[0].name, result.album.images[0].url)}} 
                    className='add-song-btn'
                    >
                        + Add Song
                    </button>
                   </div>
               </div>
            ))}
            </div>
        );
    }
}

export default outputSearch;