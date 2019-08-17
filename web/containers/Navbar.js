import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Image } from 'semantic-ui-react';
import logo from '../public/logo-lg.jpg';

export default class NavigationBar extends React.Component {
  render() {
    const { id, email } = this.props.currentUser;

    let name = ''

    if (email) {
      name = email.substring(0, email.indexOf('@')).toUpperCase();
    }

    const userLink = (
      <div>
        <a className='nav-link' href='/create-alert'>ALERT US</a>
        <a className='nav-link' href='/profile'>{name}</a>
        <a className='nav-link' href='/logout'>LOGOUT</a>
      </div>
    )
    const guestLink = (
      <div>
        <a className='nav-link' href='/login'>Login</a>
        <a className='nav-link' href='/register'>Register</a>
      </div>
    )

    return (
      <Menu secondary>
        <Menu.Item>
          <Image src={logo} size='small' />
          <Menu.Item className='routeName' name='Alpha' />
        </Menu.Item>
        <Menu.Menu className='right-menu-item' position='right'>
          <Menu.Item>
            {id ? userLink : guestLink}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
