import React, { Component } from 'react';
import "./App.css";
import axios from "axios"
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

    }
    componentWillUnmount(){
        this._isMounted=false;
        this.setState({songs:[]})
    }
    getQueue = () => {

        if(this._isMounted){
        axios.get("https://jukeberry-api.herokuapp.com/api/room-song",{
            params:{
                room_code: this.props.room_code
            }
        })
        .then(res=>{
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