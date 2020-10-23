import React, { Component } from 'react';

class Queue extends Component {
    constructor(props){
        super(props);
        this.state={
            thisQueue:[],
            anotherState:""
        }
    }
    addtoQueue =(track)=>{
        
        var tempArray = this.state.thisQueue;
        tempArray.push(track);
        // console.log(tempArray)
        console.log(this.state)
        this.setState({thisQueue:tempArray})
        // 
    }
    getQueue=()=>{
        return this.state.thisQueue;
    }



    render() {
        return (
            <div>
                {/* {console.log(this.state.queueArray)} */}
            </div>
        );
    }
}

export default Queue;