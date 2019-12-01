import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentSuccess from './presenter';

class Container extends Component{

    static propTypes = {
        goHome: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            isDeposit: props.location.state ? props.location.state.isDeposit ? props.location.state.isDeposit : false : false
        }
    }

    render(){
        return(
            <PaymentSuccess 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;