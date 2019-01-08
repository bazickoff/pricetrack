import React, { Component } from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';

const NavigationAuth = ({ authUser, onClickSignIn, onClickLogout }) => (
  <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <Helmet bodyAttributes={{
        class: 'bg-light'
    }}>
      <meta charSet="utf-8" />
      <title>Price Track</title>
    </Helmet>

    <a className="navbar-brand mr-auto mr-lg-3" href="#">Price Tracker</a>
    <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
      
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/">Dashboard <span className="sr-only">(current)</span></Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/manage">Manage</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/cronjob">Cronjob</Link>
        </li>
      </ul>

      <form className="form-inline">
        <input className="form-control mr-sm-2" type="search" placeholder="URL e.g. tiki.vn, shopee.vn" aria-label="URL" />
        <button className="btn btn-primary" type="submit">Track</button>
      </form>

      <ul className="navbar-nav ml-auto">
        {!authUser ? (
                      <li id="nav-login-btn" onClick={onClickSignIn}>
                        Login
                      </li>
                    )
                  : (
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {authUser.displayName}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a className="dropdown-item" href="#">Profile</a>
                          <a className="dropdown-item" href="#">Tracking</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="javascript:;" onClick={onClickLogout}>Logout</a>
                          
                        </div>
                      </li>
                    )
        }
      </ul>

    </div>
  </nav>
)


class NavBarBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onClickSignIn = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        console.log('socialAuthUser', socialAuthUser)
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onClickLogout = event => {

  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => <NavigationAuth authUser={authUser} 
                                     onClickSignIn={this.onClickSignIn}
                                     onClickLogout={this.onClickLogout} />}
      </AuthUserContext.Consumer>
    )
  }
}

const NavBar = withFirebase(NavBarBase);
export default NavBar; 