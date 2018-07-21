import React from 'react';
import '../styles/Settings.css';
import { postUser } from '../firebase/postToDb';

class Settings extends React.Component {
  render() {
    return (
      <div className="settings">
        <button className="btn" onClick={postUser('20/02/1994', 'haseeb', 'akbar', '01618629778')}>Post to database</button>
      </div>
    )
  }
};

export default Settings;