import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomeScreen from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object
    }

    render(){
        return(
            <HomeScreen 
                {...this.props} 
                {...this.state}
            />
        )
    }
}

export default Container; 