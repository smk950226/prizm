import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminMenu from './presenter';

class Container extends Component{
    static propTypes = {
        goSignIn: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired,
        goReservation: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        photographer: PropTypes.object.isRequired,
        goHome: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
        goTouristPhoto: PropTypes.func.isRequired,
        goStudioSetting: PropTypes.func.isRequired
    }

    componentDidMount = () => {
        if(!this.props.isLoggedIn){
            this.props.goHome()
        }
    }

    _logout = () => {
        this.props.logout()
        this.props.goHome()
    }
    
    render(){
        return(
            <AdminMenu 
            {...this.props}
            {...this.state}
            logout={this._logout}
            />
        )
    }
}

export default Container;