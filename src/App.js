import React, {Component} from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
// import fakeAuth from './components/fakeAuth'
import authentication from './components/authentication';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export const fakeAuth = {
  isAuthenticated:false,
  authenticate(){
    this.isAuthenticated = true;
  },
  signout(){
    this.isAuthenticated = false;
  }
}

const AuthenticateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} app={this} />
      : <Redirect to='/login' />
  )} />
)

const linkUrl = <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"} >Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/signup"}>Signup</Link>
                  </li>
                </ul>


class App extends Component {
  render(){
    console.log(fakeAuth.isAuthenticated)

  return (
    <div className="App">
     
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarText">
          {linkUrl}
          {/* <Route exact path="/" component={Home} /> */}
        </div>
      </nav>
      <Route exact path="/login" component={Login}  history={this.props.history} />
      <Route exact path="/signup" component={Signup} history={this.props.history} />
      <AuthenticateRoute path='/' component={Home} history={this.props.history}/>
      
    </div>
  );
}
}

export default App;
