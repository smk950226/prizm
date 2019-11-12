import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileMenu from './presenter';

class Container extends Component{
    static propTypes = {
        logout: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        notification: PropTypes.array,
        goSignIn: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired,
        goMySchedule: PropTypes.func.isRequired,
        profile: PropTypes.object,
        goProfile: PropTypes.func.isRequired
    }

    _logout = () => {
        this.props.logout()
        this.props.goHome()
        this.setState({
            showMenu: false
        })
    }

    render(){
        return(
            <ProfileMenu 
            {...this.props} 
            {...this.state} 
            logout={this._logout}
            />
        )
    }
}

export default Container;