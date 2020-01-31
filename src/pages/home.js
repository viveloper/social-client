import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
// components
import Scream from '../components/Scream';

export default class home extends Component {
  state = {
    screams: null
  };
  componentDidMount() {
    axios
      .get('/screams')
      .then(res => {
        this.setState({
          screams: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => (
        <Scream key={scream.screamId} scream={scream} />
      ))
    ) : (
      <p>loading...</p>
    );
    return (
      <Grid container spacing={5}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}
