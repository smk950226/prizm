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
            isDeposit: props.location.state ? props.location.state.isDeposit ? props.location.state.isDeposit : false : false,
            price: props.location.state ? props.location.state.price ? props.location.state.price : 0 : 0,
            now: props.location.state ? props.location.state.now ? props.location.state.now : new Date().getTime() : new Date().getTime(),
        }
    }

    componentDidMount = () => {
        const { price } = this.state;
        const { goHome } = this.props;
        if(price === 0) {
            goHome()
        }
    }

    render(){
        const deadline = new Date(this.state.now + 1000*60*60*24)
        return(
            <PaymentSuccess 
            {...this.props}
            {...this.state}
            deadline={deadline}
            />
        )
    }
}

export default Container;