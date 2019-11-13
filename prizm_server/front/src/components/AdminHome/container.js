import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminHome from './presenter';

class Container extends Component{
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