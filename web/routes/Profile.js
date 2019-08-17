import React from 'react';
import decode from 'jwt-decode';

let currentUser = {}

try {
  currentUser = decode(localStorage.getItem('token')).user;
} catch (err) {
  console.log(err)
}

export default () => (
  <div>
    <h3>{currentUser.id}</h3>
    <h3>{currentUser.email}</h3>
  </div>
);
