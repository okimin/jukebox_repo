import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import "./App.css";
class QueueComponent extends Component {

    getQueue = () => {
        SpotifyWebApi.queue()
    }
    render() {
        return (
            <div className="song-queue-display">
               
                    <div className = "column">Song Title</div>
                    <div className = "column">User</div>
                    <div className = "column">
                        <button className="add-song"> vote  song </button>
                    </div>
                {/* {this.props.queueArray.map(QA=>(
                    <div>hi</div>
                ))} */}
            </div>
        );
    }
}

export default QueueComponent;