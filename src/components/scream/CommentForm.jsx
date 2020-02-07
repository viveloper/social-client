import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { submitComment } from '../../redux/actions/dataAction';

const styles = theme => ({
  textField: theme.textField,
  button: theme.button,
  visibleSeparator: theme.visibleSeparator
});

class CommentForm extends Component {
  state = {
    body: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submitComment(this.props.screamId, { body: this.state.body });
  };

  render() {
    const {
      classes,
      authenticated,
      ui: { errors }
    } = this.props;

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on scream"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Grid>
    ) : null;

    return commentFormMarkup;
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  authenticated: state.user.authenticated
});

const mapDisaptchToProps = dispatch => ({
  submitComment: (screamId, commentData) => {
    dispatch(submitComment(screamId, commentData));
  }
});

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(withStyles(styles)(CommentForm));
