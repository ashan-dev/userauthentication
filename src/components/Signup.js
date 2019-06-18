import React, { Component } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';
//import './App.css';
//import '~bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


const api = "https://reqres.in"
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', email:'', password:'',confirmPassword:'' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: event.target.value },()=>{
      console.log(this.state.email);
      console.log(this.state.password);
      console.log(this.state.confirmPassword)
    });

  }
  
  handleSubmit(event) {
    event.preventDefault();
    const self =this;
    const { password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      axios.post(api+'/api/register', {
        email: this.state.email,
        password: this.state.password
      })
      .then(function (response) {
        self.props.history.push('/login');
        console.log(response);
        
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    const {email,password, confirmPassword} =this.state;
    return (
      <div className="container">
        <div className="col-md-6">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="ConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" >
              Signup
            </Button>
          </Form>
        </div>

      </div>
    );
  }
}

export default Signup;