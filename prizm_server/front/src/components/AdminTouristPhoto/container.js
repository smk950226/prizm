import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminOrderList from './presenter';

class Container extends Component{
    static propTypes = {
        getAdminOrderList: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object.isRequired,
        goHome: PropTypes.func.isRequired,
        photographer: PropTypes.object.isRequired,
        goStudioSetting: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        orderList: []
    }

    componentDidMount = async() => {
        const { getAdminOrderList, isLoggedIn, profile, goHome, photographer, goStudioSetting } = this.props;
        if(isLoggedIn){
            if(profile && (profile.user_type === 'photographer')){
                if(photographer.id){
                    const orderList = await getAdminOrderList()
                    this.setState({
                        orderList,
                        loading: false
                    })
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

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.isLoggedIn && !this.props.isLoggedIn){
            this.props.goHome()
        }
        if(this.props.profile && (this.props.profile.user_type !== 'photographer')){
            this.props.goHome()
        }
    }

    _refresh = async() => {
        const { getAdminOrderList, isLoggedIn, profile, goHome } = this.props;
        if(isLoggedIn){
            if(profile && (profile.user_type === 'photographer')){
                const orderList = await getAdminOrderList()
                this.setState({
                    orderList,
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
            refresh={this._refresh}
            />
        )
    }
}

export default Container;