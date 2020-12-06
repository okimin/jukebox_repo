import React, { Component } from 'react';
// import Spotify from 'spotify-web-api-js';
import "./App.css";

// const SpotifyWebApi = new Spotify();
class QueueComponent extends Component {

    getQueue = () => {
        // SpotifyWebApi.getMyCurrentPlayingTrack
    }
    render() {
        return (
            <div className="song-queue-display">
               
                    <div className = "column"><h3>Song Title</h3></div>
                    <div className = "column"><h3>User</h3></div>
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