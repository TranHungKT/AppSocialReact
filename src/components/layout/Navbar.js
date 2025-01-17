import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from '../sceam/PostScream';
import Notifications from './Notifications';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
//Icons stuff

import HomeIcon from '@material-ui/icons/Home';


//Redux 
import {connect} from 'react-redux';
class NavBar extends Component {
  render() {
    const {authenticated} = this.props;
    return (
      <AppBar>
        <ToolBar className ="nav-container">
          {authenticated ? (
            <Fragment>
              <PostScream/>
              <Link to = "/">
                <MyButton tip = "Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              {/* <MyButton tip = "Notifications"> */}
                 <Notifications/>
              {/* </MyButton> */}
            </Fragment>
          ): (
            <Fragment>
              <Button color = "inherit" component = {Link} to ="/login">Login</Button>
              <Button color = "inherit" component = {Link} to ="/">Home</Button>
              <Button color = "inherit" component = {Link} to ="/signup">Signup</Button>
            </Fragment>
            )}
        </ToolBar>
      </AppBar>
    );
  }
}

NavBar.propTypes =  {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(NavBar);
