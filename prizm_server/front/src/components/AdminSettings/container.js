import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminSettings from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        goProfile: PropTypes.func.isRequired,
        goAccount: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    }

    _logout = () => {
        this.props.goHome()
        this.props.logout()
    }

    render(){
        return(
            <AdminSettings 
            {...this.props}
            {...this.state}
            logout={this._logout}
            />
        )
    }
}

export default Container;