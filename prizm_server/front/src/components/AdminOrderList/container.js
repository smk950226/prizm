import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminOrderList from './presenter';

class Container extends Component{
    static propTypes = {
        getAdminOrderList: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object.isRequired,
        goHome: PropTypes.func.isRequired,
        photographer: PropTypes.object.isRequired
    }

    state = {
        loading: true,
        page: 'all',
        orderList: []
    }

    componentDidMount = async() => {
        const { getAdminOrderList, isLoggedIn, profile, goHome } = this.props;
        if(isLoggedIn){
            if(profile && (profile.user_type === 'photographer')){
                const orderList = await getAdminOrderList()
                let pendingList = []
                let confirmedList = []
                let pastList = []
                orderList.map(order => {
                    if(order.status === 'pending'){
                        pendingList.push(order)
                    }
                    else if(order.status === 'confirmed'){
                        confirmedList.push(order)
                    }
                    else{
                        pastList.push(order)
                    }
                })
                this.setState({
                    orderList,
                    pendingList,
                    confirmedList,
                    pastList,
                    loading: false
                })
            }
            else{
                goHome()
            }
        }
        else{
            goHome()
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.isLoggedIn && !this.props.isLoggedIn){
            this.props.goHome()
        }
        if(this.props.profile && (this.props.profile.user_type !== 'photographer')){
            this.props.goHome()
        }
    }

    _handlePageChange = (page) => {
        this.setState({
            page
        })
    }

    _refresh = async() => {
        const { getAdminOrderList, isLoggedIn, profile, goHome } = this.props;
        if(isLoggedIn){
            if(profile && (profile.user_type === 'photographer')){
                const orderList = await getAdminOrderList()
                let pendingList = []
                let confirmedList = []
                let pastList = []
                orderList.map(order => {
                    if(order.status === 'pending'){
                        pendingList.push(order)
                    }
                    else if(order.status === 'confirmed'){
                        confirmedList.push(order)
                    }
                    else{
                        pastList.push(order)
                    }
                })
                this.setState({
                    orderList,
                    pendingList,
                    confirmedList,
                    pastList,
                    loading: false
                })
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
            handlePageChange={this._handlePageChange}
            refresh={this._refresh}
            />
        )
    }
}

export default Container;