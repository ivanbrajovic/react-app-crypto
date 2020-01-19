import React, { Component } from 'react'
import { Menu,
  Button,
  Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import 'semantic-ui-css/semantic.min.css'

class Header extends Component {

  state = { activeItem: window.location.pathname }

  handleItemClick = (e, { to }) => this.setState({ 
    activeItem: to
  })

  handleLoginButton = () => this.props.handleLogin(true)
  
  render () {
    const { activeItem } = this.state
    return (
      <div className="Header">
      {/* navigation */}
        <Menu pointing>
          <Menu.Item
            as={Link}
            to='/'
            name='Home'
            active={activeItem === '/'}
            onClick={this.handleItemClick}
          />
          {
        //show profile if user is logged in
          (window.localStorage?.isLogged ||
          this.props.isUserLoggedIn) && (
            <Menu.Item
              as={Link}
              to='/profile'
              name='Profile'
              active={activeItem === '/profile'}
              onClick={this.handleItemClick}
            />
          )
          }
          <Menu.Item position="right">
          {
            (window.localStorage?.isLogged ||
              this.props.isUserLoggedIn)
            ? <Icon disabled name="check" color="green" />
            : <Button primary onClick={this.handleLoginButton}>Login</Button>
          }
          </Menu.Item>    
        </Menu>
      </div>
    )
  }
}

export default Header
