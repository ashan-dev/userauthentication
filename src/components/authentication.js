import React, {Component} from 'react';
class authentication extends Component{
  
    state = {
      isAuthenticated:false
     }
    
    authenticate = () =>{
      this.setState({
        isAuthenticated : true
      })
    }
    signout = () => {
      this.setState({
        isAuthenticated : false
      })
      
    }
  
   }
   const authentications = new authentication();
export default authentications;