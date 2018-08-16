import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './pages/header'
import MainRouter from './pages/router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <MainRouter />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
