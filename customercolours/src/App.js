import React, { Component } from 'react';
import './styles/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import Customers from './components/Customers';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Sidebar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/customers' component={Customers} />
            <Route exact path='/settings' component={Settings} />
            <Route component = {this.NoMatch} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  NoMatch = () => (
    <div>
      <h3>404 page not found</h3>
    </div>
  )
}

export default App;
