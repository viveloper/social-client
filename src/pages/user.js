import React, { Component } from 'react';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataAction';
import StaticProfile from '../components/profile/StaticProfile';

class user extends Component {
  state = {
    profile: null
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({ profile: res.data.user });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { screams, loading } = this.props.data;
    const screamsMarkup = loading ? (
      <p>Loading data...</p>
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    );

    return (
      <Grid container spacing={5}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>Loading profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = dispatch => ({
  getUserData: userHandle => {
    dispatch(getUserData(userHandle));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(user);
