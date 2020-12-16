import React, { Component } from 'react';
// import Spotify from 'spotify-web-api-js';
import "./App.css";
import axios from "axios"
// const SpotifyWebApi = new Spotify();
class QueueComponent extends Component {
    _isMounted = false;

    constructor(props){

        super();
        // console.log(props.roomCode);
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
        this._isMounted=true
        this.getQueue();
        setInterval(this.getQueue,5000);

    }
    componentDidUpdate(){
        // this.getQueue();

    }
    componentWillUnmount(){
        this._isMounted=false;
        this.setState({songs:[]})
    }
    getQueue = () => {
        // console.log(this.props);

        if(this._isMounted){
        // var temp =[]
        axios.get("https://jukeberry-api.herokuapp.com/api/room-song",{
            params:{
                room_code: this.props.room_code
            }
        })
        .then(res=>{
            // console.log(res);
            var data= res.data
            this.setState({songs:data})

            this.props.update(data)

        })
        .catch(err=>{
            this.setState({songs:[]})
        })
        }
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
                    
            </div>
        );
    }
}

export default QueueComponent;