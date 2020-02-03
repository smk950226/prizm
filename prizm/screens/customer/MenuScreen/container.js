import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuScreen from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        getProfile: PropTypes.func.isRequired,
    }

    render(){
        return(
            <MenuScreen 
                {...this.props} 
                {...this.state}
            />
        )
    }
}

export default Container; 