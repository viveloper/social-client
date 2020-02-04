import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core';
import AppIcon from '../images/icon.png';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userAction';

const styles = theme => {
  const {
    form,
    image,
    pageTitle,
    textField,
    button,
    customError,
    progress
  } = theme;
  return {
    form,
    image,
    pageTitle,
    textField,
    button,
    customError,
    progress
  };
};

class login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      classes,
      ui: { loading, errors }
    } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              don't have an account? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  loginUser: (userData, history) => {
    dispatch(loginUser(userData, history));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(login));
