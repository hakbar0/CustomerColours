import React from 'react';
import '../styles/Settings.css';
import { postUser } from '../firebase/postToDb';
import { postRandomUsers } from '../firebase/postUsers';

class Settings extends React.Component {
  render() {
    return (
      <div className="settings">
        <button className="btn" onClick={() => { postRandomUsers()}}>Seed database with random data</button>
      </div>
    )
  }
};

export default Settings;