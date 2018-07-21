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
              Object.entries(this.state.customers).map(function (customer) {
                return (
                  <tr>
                    <td><Link to={`customer/${customer[0]}`} style={{ textDecoration: 'none' }}>{customer[1].firstname}</Link></td>
                    <td><Link to={`customer/${customer[0]}`} style={{ textDecoration: 'none' }}>{customer[1].surname}</Link></td>
                    <td><Link to={`customer/${customer[0]}`} style={{ textDecoration: 'none' }}>{customer[1].DOB}</Link></td>
                    <td><Link to={`customer/${customer[0]}`} style={{ textDecoration: 'none' }}>{customer[1].telephone}</Link></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
};

export default Home;
