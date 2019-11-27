import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentDetail from './presenter';

class Container extends Component{

    constructor(props){
        super(props){
            
        }
    }

    render(){
        return(
            <PaymentDetail 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;