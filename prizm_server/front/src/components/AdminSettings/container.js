import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminSettings from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        goProfile: PropTypes.func.isRequired,
        goAccount: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    }

    render(){
        return(
            <AdminSettings 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;