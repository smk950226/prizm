import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminNavigation from './presenter';

class Container extends Component{
    static propTypes = {
        logout: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object
    }

    constructor(props){
        super(props);
        this.state = {
            showMenu: false
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.pathname !== this.props.pathname){
            this.setState({
                showMenu: false
            })
        }
    }

    _openMenu = () => {
        this.setState({
            showMenu: true
        })
    }

    _closeMenu = () => {
        this.setState({
            showMenu: false
        })
    }

    _handleShowMenu = (state) => {
        this.setState({
            showMenu: state.isOpen
        })
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
            <AdminNavigation 
            {...this.props} 
            {...this.state} 
            openMenu={this._openMenu}
            closeMenu={this._closeMenu}
            handleShowMenu={this._handleShowMenu}
            logout={this._logout}
            />
        )
    }
}

export default Container;