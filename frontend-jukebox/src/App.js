import React, { Component } from 'react';
import {Link} from "react-router-dom"
import './App.css';

class App extends Component {

 render(){ 
   return (
    <div className="App-bg">
     
      <div className="options">
        <Link to="/Room">
          <button>Make A Room</button>
        </Link>  
        <form>
          <label>Join Room</label><br/>
          <input type="password"/>
        </form>
        
        
      </div>

    </div>
  );
}
}

export default App;
