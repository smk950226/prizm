import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminOrderList from './presenter';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Container extends Component{
    static propTypes = {
        goReservation: PropTypes.func.isRequired,
        goStudioSetting: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object.isRequired,
        photographer: PropTypes.object.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func
    }

    componentDidMount = async() => {
        const { goReservation, isLoggedIn, profile, photographer, goHome } = this.props;
        if(isLoggedIn){
            if(profile && (profile.user_type === 'photographer')){
                if(photographer.id){
                    goReservation()
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
    }

    render(){
        return(
            <AdminOrderList 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;