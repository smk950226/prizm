import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MySchedule from './presenter';

class Container extends Component{
    static propTypes = {
        orderList: PropTypes.array,
        getOrderList: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        goMyScheduleDetail: PropTypes.func.isRequired
    }

    componentDidMount = async() => {
        if(!this.props.isLoggedIn){
            this.props.goHome()
        }
    }

    render(){
        return(
            <MySchedule {...this.props} {...this.state} />
        )
    }
}

export default Container;