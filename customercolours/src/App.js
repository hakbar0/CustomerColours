import React, { Component } from 'react';
import './styles/App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import Customers from './components/Customers';
import Create from './components/Create';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Sidebar />
          <Switch>
            <Route exact path='/' component={Customers} />
            <Route exact path='/create' component={Create} />
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
