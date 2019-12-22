import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminOrderList from './presenter';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Container extends Component{
    static propTypes = {
        getAdminOrderList: PropTypes.func.isRequired,
        getAdminOrderListMore: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object.isRequired,
        goHome: PropTypes.func.isRequired,
        photographer: PropTypes.object.isRequired,
        goStudioSetting: PropTypes.func.isRequired,
        goProfile: PropTypes.func.isRequired,
        goAccount: PropTypes.func.isRequired,
        getRequestList: PropTypes.func.isRequired,
        getRequestListMore: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        status: 'all',
        orderList: [],
        requestList: [],
        page: 1,
        hasNextPage: true,
        isLoadingMore: false,
        showRequestDetail: false
    }

    componentDidMount = async() => {
        const { getAdminOrderList, getRequestList, isLoggedIn, profile, goHome, photographer, goStudioSetting } = this.props;
        const { status } = this.state;
        if(isLoggedIn){
            if(profile && (profile.user_type === 'photographer')){
                if(photographer.id){
                    if(status === 'custom'){
                        const requestList = await getRequestList()
                        this.setState({
                            requestList,
                            loading: false,
                            page: 1,
                            hasNextPage: true,
                            isLoadingMore: false
                        })
                    }
                    else{
                        const orderList = await getAdminOrderList(status)
                        this.setState({
                            orderList,
                            loading: false,
                            page: 1,
                            hasNextPage: true,
                            isLoadingMore: false
                        })
                    }
                    
                }
                else{
                    goStudioSetting()
                }
            }
            else{
                goHome()
            }
        }
        else{
            goHome()
        }
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevProps.isLoggedIn && !this.props.isLoggedIn){
            this.props.goHome()
        }
        if(this.props.profile && (this.props.profile.user_type !== 'photographer')){
            this.props.goHome()
        }
        if(prevState.status !== this.state.status){
            this.setState({
                loading: true,
                page: 1,
                hasNextPage: true,
                isLoadingMore: false
            })
            if(this.state.status === 'custom'){
                const requestList = await this.props.getRequestList()
                this.setState({
                    requestList,
                    loading: false
                })
            }
            else{
                const orderList = await this.props.getAdminOrderList(this.state.status)
                this.setState({
                    orderList,
                    loading: false
                })
            }
        }
    }

    _orderListMore = async() => {
        const { page, isLoadingMore, hasNextPage, status } = this.state;
        const { getAdminOrderListMore, getRequestListMore } = this.props;
        if(!isLoadingMore){
            if(hasNextPage){
                this.setState({
                    isLoadingMore: true
                })
                if(status === 'custom'){
                    const result = await getRequestListMore(page+1)
                    if(result){
                        this.setState({
                            page: page+1,
                            requestList: [...this.state.requestList, ...result]
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
                else{
                    const result = await getAdminOrderListMore(page+1, status)
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
    }

    _handleStatusChange = (status) => {
        this.setState({
            status
        })
    }

    _refresh = async(obj) => {
        const { getAdminOrderList, getRequestList, isLoggedIn, profile, goHome } = this.props;
        const { status } = this.state;
        if(isLoggedIn){
            if(profile && (profile.user_type === 'photographer')){
                if(status === 'custom'){
                    let newRequestList = []
                    this.state.requestList.map(request => {
                        if(request.id === obj.id){
                            newRequestList.push(obj)
                            return null
                        }
                        else{
                            newRequestList.push(request)
                        }
                        this.setState({
                            requestList: newRequestList,
                            loading: false
                        })
                    })
                }
                else{
                    let newOrderList = []
                    this.state.orderList.map(order => {
                        if(order.id === obj.id){
                            newOrderList.push(obj)
                            return null
                        }
                        else{
                            newOrderList.push(order)
                        }
                        this.setState({
                            orderList: newOrderList,
                            loading: false
                        })
                    })
                }
            }
            else{
                goHome()
            }
        }
        else{
            goHome()
        }
    }

    render(){
        return(
            <AdminOrderList 
            {...this.props}
            {...this.state}
            orderListMore={this._orderListMore}
            handleStatusChange={this._handleStatusChange}
            refresh={this._refresh}
            />
        )
    }
}

export default Container;