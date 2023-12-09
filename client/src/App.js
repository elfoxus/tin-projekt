import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import axios from "axios";
import './App.css';

const App = () => {

    useEffect(() => {
        axios.get('/api')
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
        }, []);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
}

export default App;
