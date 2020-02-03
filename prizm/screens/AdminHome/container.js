import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminHome from './presenter';

class Container extends Component{
    static propTypes = {
        goSignIn: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired,
        goReservation: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        photographer: PropTypes.object
    }

    componentDidMount = () => {
        const { isLoggedIn, goReservation, profile, photographer } = this.props;
        if(isLoggedIn && profile && (profile.user_type === 'photographer') && photographer){
            goReservation()
        }
    }
    
    render(){
        return(
            <AdminHome 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;