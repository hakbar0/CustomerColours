import React, { Component } from 'react';
import './styles/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Sidebar from './components/Sidebar';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Sidebar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component = {this.NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  NoMatch = () => (
    <div className="container">
      <h3 className='four-zero-four jumbotron'>404 page not found</h3>
    </div>
  )
}

export default App;
