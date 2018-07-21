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
    update: false,
    background: 'red'
  };

  getAllUsers = () => { db.ref("/customers").on("value", res => { this.setState({ customers: res.val() }); }) };

  currentId = (currentId, firstname, lastname, dob, number, background) => { 
    this.setState({ currentId, firstname, lastname, dob, number, background }); 
    this.hide("block");
  };

  flag = (update) => {this.setState({update})}

  hide = (style) => { 
    this.setState({ style }) 
    this.flag(false);
  }

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
              Object.entries(this.state.customers).reverse().map((customer) => {
                return (
                  <tr className="customer" key={customer[0]} style={{ background: this.colorChange(customer[1].firstname) }}
                    onClick={this.currentId.bind(this, customer[0], customer[1].firstname,
                      customer[1].surname, customer[1].DOB,
                      customer[1].telephone, 
                      this.colorChange(customer[1].firstname)
                    )}>

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

        <div id="myModal" className={`modal`} style={{ display: this.state.style}}>
          <div className={`modal-content`} style={{background: this.state.background}}>
            <span className={`close`} onClick={this.hide.bind(null, "none")} >&times;</span>
            {!this.state.update ?
            <div className ="content">
            <h1>Name: {this.state.firstname}</h1>
            <h1>Last Name: {this.state.lastname}</h1>
            <h1>DOB: {this.state.dob}</h1>
            <h1>Number: {this.state.number}</h1>
            <button onClick={() => this.flag(true)} >Go To Update</button>
            <button onClick={() => this.deleteUser()} >Delete</button>
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
            <input type="text" className="form-control" id="form-number" value={this.state.number} required />

            <button onClick={() => this.flag(false)} >View Details</button>

            <button onClick={() => this.editUser()} >Update</button>

            </div>
            }
          </div>
        </div>

      </div>
    )
  }

  colorChange= (name) => {
    let nameCount = 0;
    for(let i =0; i < name.length; i++){nameCount += name.charCodeAt(i);}
    if(nameCount > 255) nameCount = nameCount%147;
    let css= ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
    return css[nameCount];
  }

  deleteUser = () => {
    let id = this.state.currentId;
    db.ref(`/customers/${id}`).once('value', res => { db.ref(`/customers/${id}`).remove(); })
    this.hide("none");
  }

  editUser = () => {
    db.ref(`customers/${this.state.currentId}`).update({ 
      DOB: document.getElementById('form-dob').value || this.state.dob,
      firstname: document.getElementById('form-firstname').value || this.state.firstname,
      surname: document.getElementById('form-lastname').value || this.state.lastname,
      telephone:  document.getElementById('form-number').value || this.state.number
   });
   this.hide("none");
  }
};

export default Customers;
