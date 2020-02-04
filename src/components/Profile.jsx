import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { connect } from 'react-redux';
import { uploadImage, logoutUser } from '../redux/actions/userAction';
import MyButton from './MyButton';

const styles = {
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
};

class Profile extends Component {
  handleImageChange = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.querySelector('#imageInput');
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        authenticated,
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading
      }
    } = this.props;

    if (loading) {
      return <p>loading...</p>;
    } else {
      if (authenticated) {
        return (
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className="image-wrapper">
                <img src={imageUrl} alt="profile" className="profile-image" />
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />

                <MyButton
                  tip="Edit profile picture"
                  onClick={this.handleEditPicture}
                  btnClassName="button"
                >
                  <EditIcon color="primary" />
                </MyButton>
              </div>
              <hr />
              <div className="profile-details">
                <MuiLink
                  component={Link}
                  to={`/users/${handle}`}
                  color="primary"
                  variant="h5"
                >
                  @{handle}
                </MuiLink>
                <hr />
                {bio && <Typography variant="body2">{bio}</Typography>}
                <hr />
                {location && (
                  <>
                    <LocationOn color="primary" />
                    <span>{location}</span>
                    <hr />
                  </>
                )}
                {website && (
                  <>
                    <LinkIcon color="primary" />
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {' '}
                      {website}
                    </a>
                    <hr />
                  </>
                )}
                <CalendarToday color="primary" />{' '}
                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
              </div>
              <MyButton tip="Logout" onClick={this.handleLogout}>
                <KeyboardReturn color="primary" />
              </MyButton>
              <EditDetails />
            </div>
          </Paper>
        );
      } else {
        return (
          <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
              No profile found, please login again
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Paper>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  uploadImage: formData => {
    dispatch(uploadImage(formData));
  },
  logoutUser: () => {
    dispatch(logoutUser());
  }
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
