// import components
import React, { Component } from "react";
import {PlaidLink} from "react-plaid-link";
import axios from 'axios';

// implement react components
class Link extends Component {
  constructor() {
    super();

    this.state = {
      linkToken: "",
    };

  }

  componentDidMount = async () =>{
    var response = await axios.post("/create_link_token")
    this.setState({linkToken: response.data["link_token"]});
  }
    // success handler
  handleOnSuccess = async (public_token, metadata) => {
    // send token to client server
    var data = {
      public_token: public_token
    }
    var response = await axios.post("/exchange_public_token", data);
    console.log(response)
    //to do set accessToken into sessionStorage then move onto UI calls in other components.
    sessionStorage.setItem("accessToken", response.data["access_token"]);

  }
  
  render() {
    const {linkToken} = this.state

    return (
      
      <div>
       {linkToken.toString !== 'undefined' ? 
       <PlaidLink 
       token={linkToken.toString()} 
       env="sandbox" 
       onSuccess={this.handleOnSuccess}
       onExit={this.handleOnExit}>
         Connect Bank Account
         </PlaidLink> 
         : null
        }
      </div>
    );
  }
}

export default Link;
