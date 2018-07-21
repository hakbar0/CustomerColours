import React from 'react';
import '../styles/Home.css';
import db from '../firebase/connect';
import { Link } from 'react-router-dom';

class Home extends React.Component {

  state = {
    customers: ''
  };

  getAllUsers = () => {
    db.ref("/customers").on("value", res => {
      this.setState({ customers: res.val() });
    })
  };

  componentDidMount() {
    this.getAllUsers();
  }

  render() {
    return (
      <div>
      Home
      </div>
    )
  }
};

export default Home;
