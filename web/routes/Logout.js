import React from "react";
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
  render() {
    { localStorage.removeItem("token") }
    { localStorage.removeItem("refreshToken") }
    return <Redirect to='/login' />
  }
}

export default Logout;
