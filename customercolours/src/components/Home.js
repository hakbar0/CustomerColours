import React from 'react';
import '../styles/Home.css';
import db from '../firebase/connect';

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
                    <td>{customer[1].firstname}</td>
                    <td>{customer[1].surname}</td>
                    <td>{customer[1].DOB}</td>
                    <td>{customer[1].telephone}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
};

export default Home;
