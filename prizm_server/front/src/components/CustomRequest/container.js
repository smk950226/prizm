import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomRequest from './presenter';

class Container extends Component{
    static propTypes = {
        goCustomRequestCreate: PropTypes.func.isRequired
    }

    render(){
        return (
            <CustomRequest 
            {...this.props} 
            {...this.state}
            />
        )
    }
}

export default Container; 