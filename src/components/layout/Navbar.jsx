import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import MyButton from '../MyButton';
import { connect } from 'react-redux';
import PostScream from '../scream/PostScream';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    if (authenticated) {
      return (
        <AppBar>
          <Toolbar className="nav-container">
            <PostScream />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <Notifications />
            </MyButton>
          </Toolbar>
        </AppBar>
      );
    } else {
      return (
        <AppBar>
          <Toolbar className="nav-container">
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Toolbar>
        </AppBar>
      );
    }
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
