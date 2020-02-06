import React, { Component } from 'react';
import MyButton from '../MyButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataAction';

import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { getScream } from '../../redux/actions/dataAction';

class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.screamId === this.props.screamId)
    ) {
      return true;
    } else {
      return false;
    }
  };

  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tip="Undo like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  likeScream: screamId => {
    dispatch(likeScream(screamId));
  },
  unlikeScream: screamId => {
    dispatch(unlikeScream(screamId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
