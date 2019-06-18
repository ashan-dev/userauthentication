import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import {fakeAuth} from '../App'
//import './App.css';
//import '~bootstrap/scss/bootstrap.scss';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const API = "https://reqres.in";

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { 
      email: '',
      password: '',
      users:[],
      user:[],
      redirectToReferrer: false
    };
  }
  componentDidMount(){
    const self = this;
    axios.get(API+'/api/users?page=2')
    .then(function (response) {
      console.log(response)
      self.setState({
        users: response.data.data
      })
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handleChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: event.target.value },()=>{
      console.log(this.state.email);
      console.log(this.state.password);
    });
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  getall = (event) =>{
    
    console.log(this.state.users)
    for(let x = 0; x<this.state.users.length;x++){
      if(this.state.users[x].email == this.state.email){
        this.props.history.push({
          pathname: '/',
          state:{userid:this.state.users[x].id }
        })
      }
    }
    
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const self = this;
    console.log(fakeAuth.authenticate)
    fakeAuth.authenticate(() => {
      console.log("hello world fakeAuth")
    })
      
    //console.log(fakeAuth)
    axios.post(API+'/api/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then(function (response) {
      console.log(response)
      self.getall()
      console.log(self.state.email)
      //self.props.history.push("/")
      
      // self.setState({
      //   redirectToReferrer:true
      // })
      //console.log(self.props.fakeAuth.authenticate)
      
    })
    .catch(function (error) {

      console.log(error);

    });
  }
  

  render() {
    const {email, password, redirectToReferrer } = this.state;
    // if(redirectToReferrer === true){
    //   return <Redirect to='/' />
    // } 
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
              <Form.Control type="password" placeholder="Password" name="password" value={password}  onChange={this.handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!this.validateForm()}>
              Login
            </Button>
          </Form>
        </div>
        
      </div>
      
    );
  }
}

export default Login;