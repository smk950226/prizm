import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminHome from './presenter';

class Container extends Component{
    static propTypes = {
        goSignIn: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired
    }
    
    render(){
        return(
            <AdminHome 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;