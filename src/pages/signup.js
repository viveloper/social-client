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
import { signupUser, logoutUser } from '../redux/actions/userAction';

const styles = theme => ({
  form: theme.form,
  image: theme.image,
  pageTitle: theme.pageTitle,
  textField: theme.textField,
  button: theme.button,
  customError: theme.customError,
  progress: theme.progress
});

class signup extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    handle: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
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
            Signup
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
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
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account? login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  signupUser: (newUserData, history) => {
    dispatch(signupUser(newUserData, history));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(signup));
