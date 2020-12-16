import React, { Component } from 'react';
import axios from "axios";
// import PropTypes from 'prop-types';

class Guests extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state={guests:[],}

    }

    componentDidMount() {
        axios.get(`https://jukeberry-api.herokuapp.com/api/usersinroom`,{
            params:{
                room_code:this.state.roomCode
            }
        })
        .then(res=>{
            var temp =[]
            for(var i=0; i<res.data.length;i++){
                temp.push(res.data[i].name)
            }
            this.setState({guests:temp})
            this.props.update(temp)
        })
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div>
{/* <div>Votes to skip next song</div> */}
                 Guests:
                {this.state.guests.map((guest,index)=>(
                                <div key={index}>{guest}</div> 
                              ))} 
            </div>
        );
    }
}

Guests.propTypes = {

};

export default Guests;