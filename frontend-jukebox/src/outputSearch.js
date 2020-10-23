import React, { Component } from 'react';
// import Queue from ""
  
import Queue from "./Queue";
import Spotify from "spotify-web-api-js";
import Login from "./Login"

const login = new Login();
const SpotifyWebApi = new Spotify();

const queue = new Queue();

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
    addToQueue =(uri)=>{
        // console.log(uri)
        SpotifyWebApi.queue(uri);
    }
    // addToQueue = (result)=>{
    //     this.setState({
    //         track:{
    //             // id:this.state.id+1,
    //             trackImage: result.album.images[0].url,
    //             trackName: result.name,
    //             trackURI:result.uri,
    //             trackArtist:""
    //         }
    //     })
    //     var temp = this.state.track
    //     queue.addtoQueue(temp);
    // }
    

    render() {
        return (
            <div >
            {/* {console.log(this.props.results)} */}
            {this.props.results.map( (result,index) =>(
                <div key={index} className="song-found">
                    {/* {index} */}
                    <div className="search-list">
                        <div>
                        <img src={result.album.images[0].url} className="album album-search"alt= "album conver"/>
                        <h3 className='search-text'>{result.name}</h3> 
                        <h4 className='search-text'>{result.artists[0].name}</h4>
                    </div>
                    <button 
                    onClick={()=> this.addToQueue(result.uri)} 
                    className='add-song-btn'
                    >
                        Add song
                    </button>
                   </div>
               </div>
            ))}
            </div>
        );
    }
}

export default outputSearch;