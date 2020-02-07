import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MyButton from '../MyButton';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

import { getScream, clearErrors } from '../../redux/actions/dataAction';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const styles = theme => ({
  invisibleSeparator: theme.invisibleSeparator,
  visibleSeparator: theme.visibleSeparator,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  dialogContent: {
    padding: 20
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 0,
    marginBotton: 50
  }
});

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, screamId } = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      ui: { loading }
    } = this.props;

    const { open } = this.state;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={110} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={0}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand scream"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => ({
  scream: state.data.scream,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  getScream: screamId => {
    dispatch(getScream(screamId));
  },
  clearErrors: () => {
    dispatch(clearErrors());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ScreamDialog));
