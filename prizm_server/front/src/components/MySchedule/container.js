import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MySchedule from './presenter';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Container extends Component{
    static propTypes = {
        orderList: PropTypes.array,
        getOrderList: PropTypes.func.isRequired,
        getOrderListMore: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        goMyScheduleDetail: PropTypes.func.isRequired,
        goPayment: PropTypes.func.isRequired,
        goReveiwCreate: PropTypes.func.isRequired,
        checkNotification: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        const { orderList } = props;
        this.state = {
            orderList: orderList ? orderList : [],
            loading: true,
            fetchedOrderList: false,
            fetchClear: false,
            page: 1,
            hasNextPage: true,
            isLoadingMore: false
        }
    }

    componentDidMount = async() => {
        if(!this.props.isLoggedIn){
            this.props.goHome()
        }
        if(this.props.orderList){
            this.props.getOrderList()
            await this.props.checkNotification()
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
                update.orderList = nextProps.orderList
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = async() => {
        if(this.state.fetchedOrderList && !this.state.fetchClear){
            await this.props.checkNotification()
            this.setState({
                loading: false,
                fetchClear: true,
            })
        }
    }

    _orderListMore = async() => {
        const { page, isLoadingMore, hasNextPage } = this.state;
        const { getOrderListMore } = this.props;
        if(!isLoadingMore){
            if(hasNextPage){
                this.setState({
                    isLoadingMore: true
                })
                const result = await getOrderListMore(page+1)
                if(result){
                    this.setState({
                        page: page+1,
                        orderList: [...this.state.orderList, ...result]
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
                else{
                    this.setState({
                        hasNextPage: false
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
            }
        }
    }

    render(){
        return(
            <MySchedule 
            {...this.props} 
            {...this.state} 
            orderListMore={this._orderListMore}
            />
        )
    }
}

export default Container;