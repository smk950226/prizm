import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminNavigation from './presenter';

class Container extends Component{
    static propTypes = {
        logout: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        goMenu: PropTypes.func.isRequired,
        openMobile: PropTypes.func.isRequired,
        showMobile: PropTypes.bool.isRequired,
        showLocationModal: PropTypes.bool.isRequired,
        showOptionModal: PropTypes.bool.isRequired
    }

    render(){
        return(
            <AdminNavigation 
            {...this.props} 
            {...this.state} 
            />
        )
    }
}

export default Container;