import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../MyButton';

import { postScream } from '../../redux/actions/dataAction';
import {
  OPEN_POST_SCREAM,
  CLOSE_POST_SCREAM,
  CLEAR_ERRORS,
  SET_POST_SCREAM_BODY
} from '../../redux/types';

const styles = theme => ({
  textField: theme.textField,
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  },
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  }
});

class PostScream extends Component {
  handleOpen = () => {
    this.props.openPostScream();
  };

  handleClose = () => {
    this.props.closePostScream();
    this.props.clearErrors();
  };

  handleChange = e => {
    this.props.setPostScreamBody(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.postScream({ body: this.props.body });
  };

  render() {
    const {
      classes,
      ui: { loading, errors },
      isPostScreamOpened
    } = this.props;
    return (
      <>
        <MyButton onClick={this.handleOpen} tip="Post a Scream!">
          <AddIcon color="primary" />
        </MyButton>
        <Dialog
          open={isPostScreamOpened}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SCREAM!!"
                multiline
                rows="3"
                placeholder="Scream at your fellow apes"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  isPostScreamOpened: state.postScream.isPostScreamOpened,
  body: state.postScream.body
});

const mapDispatchToProps = dispatch => ({
  postScream: newScream => {
    dispatch(postScream(newScream));
  },
  clearErrors: () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  },
  openPostScream: () => {
    dispatch({ type: OPEN_POST_SCREAM });
  },
  closePostScream: () => {
    dispatch({ type: CLOSE_POST_SCREAM });
  },
  setPostScreamBody: value => {
    dispatch({
      type: SET_POST_SCREAM_BODY,
      payload: value
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostScream));
