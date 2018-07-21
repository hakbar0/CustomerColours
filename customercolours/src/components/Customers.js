import React from 'react';
import '../styles/Customers.css';
import db from '../firebase/connect';
import { Link } from 'react-router-dom';

class Customers extends React.Component {

  state = {
    customers: '',
    currentId: '',
    firstname: '',
    lastname: '',
    dob: '',
    number: '',
    style: 'none',
    update: false
  };

  getAllUsers = () => { db.ref("/customers").on("value", res => { this.setState({ customers: res.val() }); }) };

  currentId = (currentId, firstname, lastname, dob, number) => { 
    this.setState({ currentId, firstname, lastname, dob, number }); 
    this.hide("block");
  };

  hide = (style) => { this.setState({ style }) };

  flag = (update) => {this.setState({update})}

  componentDidMount() { this.getAllUsers(); };

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>DOB</th>
              <th>Number</th>
            </tr>
            {
              this.state.customers &&
              Object.entries(this.state.customers).map((customer) => {
                return (

                  <tr className="customer" key={customer[0]}
                    onClick={this.currentId.bind(this, customer[0], customer[1].firstname,
                      customer[1].surname, customer[1].DOB,
                      customer[1].telephone)}>

                    <td>{customer[1].firstname}</td>
                    <td>{customer[1].surname}</td>
                    <td>{customer[1].DOB}</td>
                    <td>{customer[1].telephone}</td>

                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <div id="myModal" className={`modal`} style={{ display: this.state.style }}>
          <div className={`modal-content`}>
            <span className={`close`} onClick={this.hide.bind(null, "none")}>&times;</span>
            {!this.state.update ?
            <div className ="content">
            <h1>Name: {this.state.firstname}</h1>
            <h1>Last Name: {this.state.lastname}</h1>
            <h1>DOB: {this.state.dob}</h1>
            <h1>Number: {this.state.number}</h1>
            <button onClick={() => this.flag(true)} >Go To Update</button>
            </div>
            :
            <div className ="form-content">
            <label for="form-title"><h5 className="form-title">Edit customer details</h5></label>

            <label for="form-firstname"><h5 className="form-firstname">First Name</h5></label>
            <input type="text" className="form-control" id="form-firstname" placeholder = {this.state.firstname} required />

            <label for="form-lastname"><h5 className='form-lastname'>Last Name</h5></label>
            <input type="text" className="form-control" id="form-lastname" placeholder={this.state.lastname} required />

            <label for="form-dob"><h5 className='form-dob'>dob</h5></label>
            <input type="text" className="form-control" id="form-dob" placeholder={this.state.dob} required />

            <label for="form-number"><h5 className='form-number'>Number</h5></label>
            <input type="text" className="form-control" id="form-number" placeholder={this.state.number} required />

            <button onClick={() => this.flag(false)} >View Details</button>
            {/* Placeholder for delete */}
            <button onClick={() => this.editUser()} >Update</button>
            </div>
            }
          </div>
        </div>

      </div>
    )
  }

  editUser = () => {
    db.ref(`customers/${this.state.currentId}`).update({ 
      DOB: document.getElementById('form-dob').value,
      firstname: document.getElementById('form-firstname').value,
      surname: document.getElementById('form-lastname').value,
      telephone:  document.getElementById('form-number').value 
   });
  }
};

export default Customers;
