import React from 'react';
import '../styles/Create.css';
import db from '../firebase/connect';
import { Redirect } from 'react-router-dom';
import { postUser } from '../firebase/postToDb';

class Create extends React.Component {

  state = {
    redirect: false
  }

  createUser = () => {
    db.ref('/customers').push({
      DOB: document.getElementById('form-dob').value,
      firstname: document.getElementById('form-firstname').value,
      surname: document.getElementById('form-lastname').value,
      telephone: document.getElementById('form-number').value
    });
    this.setState({ redirect: true });
  }

  render() {
    return (

      <div className='container'>
        <form onSubmit={() => this.createUser()}>
          <div className='form-group'>
            <h3 className='story-title'>Create a user</h3>

            <label for="form-firstname"><h5 className="form-firstname">First Name</h5></label>
            <input type="text" className="form-control" id="form-firstname" placeholder="Lee" required />

            <label for="form-lastname"><h5 className='form-lastname'>Last Name</h5></label>
            <input type="text" className="form-control" id="form-lastname" placeholder="Morris" required />

            <label for="form-dob"><h5 className='form-dob'>dob</h5></label>
            <input type="text" className="form-control" id="form-dob" placeholder="20/04/1992" required />

            <label for="form-number"><h5 className='form-number'>Number</h5></label>
            <input type="text" className="form-control" id="form-number" placeholder="223-444-222" required />

            <input class="btn btn-primary submit" type="submit" value="Submit" />

          </div>

        </form>
        {this.state.redirect && <Redirect push to="/" />}
      </div>
    )
  }
}


export default Create;
