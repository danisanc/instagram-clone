import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/navbar'

import Router from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Router />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
