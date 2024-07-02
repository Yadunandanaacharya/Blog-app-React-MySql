import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { useState } from 'react'

function App() {
  const [inputs, setInputs] = useState({
    username: "user1",
    password: "password1",
  });
const handleClick = async (product)=>{
  const response = await axios.post("http://localhost:5000/payment", inputs
  , {withCredentials: true}
);
  var hi = "";
  alert(response);
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         <button onClick={handleClick}>click me</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
