import React  from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/sceam/Scream'
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';


import {connect} from 'react-redux';
import {getAllScreams} from  '../redux/actions/dataAction';

class Home extends React.Component{
  
   componentDidMount(){
     this.props.getAllScreams();
   }
  
  
  render() {
    const {screams, loading} = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream scream = {scream} key = {scream.screamId}/>)
    ) : <p>Loading...</p>

    return (
      <Grid container spacing = {10}>
        <Grid item sm = {8} xs = {12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm = {4} xs = {12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getAllScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, {getAllScreams})(Home);
