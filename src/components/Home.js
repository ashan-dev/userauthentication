import React, { Component } from 'react';
import { Button, Form, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import { withRouter,Redirect } from 'react-router-dom'

const API = "https://reqres.in";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.location.state.userid,
      user: [],
      signout:false,
      isAuthenticated: false
    };

  }
 
  componentDidMount() {
    const self = this;
    axios.get(API + `/api/users/${this.state.userId}`)
      .then(function (response) {
        console.log(response);
        self.setState({
          user: response.data.data
        }, () => {
          console.log(self.state.user)
        })
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  signout = () => {
    this.setState({
      signout:true
    })
    this.props.history.push({
      pathname: '/login',
      state: {}});
  }

  


  render() {
    const { user } = this.state;
      if(this.state.userId === undefined){
       return <Redirect to='/login' />
     } 
     else{
      return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" style={{ "padding": "5px" }}>
                <h5>{user.first_name}</h5>
              </li>
              <li className="nav-item" style={{ "padding": "5px" }}>
                <h5>{user.last_name}</h5>
              </li>
              <li className="nav-item avatar" style={{ "padding": "5px" }}>

                <img src={user.avatar} className="rounded-circle z-depth-0" alt="avatar image" height="35" />

              </li>
              <li className="nav-item">
                <Button variant="primary" onClick={this.signout} >
                  Signout
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
     }
    
  }
}

export default Home;