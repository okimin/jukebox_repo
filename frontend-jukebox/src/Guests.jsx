import React, { Component } from 'react';
import axios from "axios";
// import PropTypes from 'prop-types';

class Guests extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state={guests:[],}

        this.getGuests= this.getGuests.bind(this)
    }

    componentDidMount() {
        this.getGuests()
        setInterval(this.getGuests(),2000);
    }

    getGuests=()=>{
        console.log(this.props.room_code);
        axios.get(`https://jukeberry-api.herokuapp.com/api/usersinroom`,{
            params:{
                room_code:this.props.room_code
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