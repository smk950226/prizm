import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MySchedule from './presenter';

class Container extends Component{
    static propTypes = {
        orderList: PropTypes.array,
        getOrderList: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        goMyScheduleDetail: PropTypes.func.isRequired,
        goPayment: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        fetchedOrderList: false,
        fetchClear: false
    }

    componentDidMount = async() => {
        if(!this.props.isLoggedIn){
            this.props.goHome()
        }
        if(this.props.orderList){
            this.setState({
                loading: false,
                fetchedOrderList: true,
                fetchClear: true
            })
        }
        else{
            await this.props.getOrderList()
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedOrderList } = prevState;
        if((!fetchedOrderList)){
            let update = {}
            if(nextProps.orderList){
                update.fetchedOrderList = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.state.fetchedOrderList && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true,
            })
        }
    }

    render(){
        return(
            <MySchedule {...this.props} {...this.state} />
        )
    }
}

export default Container;