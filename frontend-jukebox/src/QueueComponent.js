import React, { Component } from 'react';
// import Spotify from 'spotify-web-api-js';
import "./App.css";
import axios from "axios"
// const SpotifyWebApi = new Spotify();
class QueueComponent extends Component {
    constructor(props){
        super();
        this.state={
            songs :[],
            song:{
                name:"",
                artist:"",
                song_id:"",
                image:""
            }
        }

    }
    componentDidMount(){
        this.getQueue();
        setInterval(this.getQueue,2000);

    }
    componentDidUpdate(){
        // this.getQueue();
    }
    getQueue = () => {
        axios.get("https://jukeberry-api.herokuapp.com/api/songs")
        .then(res=>{
            console.log(res);
            var data= res.data
            this.setState({songs:data})
        })
        .catch(err=>{console.error(err);})
    }
    render() {
        return (
            <div>
                <div className="search-list">
                    <div className = "column"><h3>Song Title</h3></div>
                    {/* <div className = "column"><h3>User </h3></div> */}
                </div>
                <div className="song-queue">
                    {this.state.songs.map((song,index) =>(
                        <div key={index} className="search-list ">
                            <div className="column">
                                <img src={song.song_pic} className="album" alt="album-cover"/>
                           
                            <h2 className="search-text">{song.name}</h2>
                            <h4 className="search-text">{song.artist_id}</h4>
                         </div>
                        </div>
                    ))}
                </div>
                    {/* <div className = "column">
                        {/* <button className="add-song"> vote  song </button> }
                    </div> */}
                {/* {this.props.queueArray.map(QA=>(
                    <div>hi</div>
                ))} */}
            </div>
        );
    }
}

export default QueueComponent;