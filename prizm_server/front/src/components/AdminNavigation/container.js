import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminNavigation from './presenter';

class Container extends Component{
    static propTypes = {
        logout: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        goMenu: PropTypes.func.isRequired,
        openMobile: PropTypes.func.isRequired,
        showMobile: PropTypes.bool.isRequired,
        showLocationModal: PropTypes.bool.isRequired,
        showOptionModal: PropTypes.bool.isRequired,
        photographer: PropTypes.object,
        goSignIn: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired,
        goReservation: PropTypes.func.isRequired,
        goTouristPhoto: PropTypes.func.isRequired,
        goStudioSetting: PropTypes.func.isRequired,
        goProfile: PropTypes.func.isRequired,
        goAccount: PropTypes.func.isRequired
    }

    state = {
        showMenu: false,
        showNav: true
    }

    componentDidMount = () => {
        if((this.props.pathname.indexOf('/message/detail/') > -1) || (this.props.pathname.indexOf('/review/list/') > -1) || (this.props.pathname.indexOf('/review/create/') > -1)){
            this.setState({
                showNav: false
            })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.pathname !== this.props.pathname){
            if(this.props.pathname.indexOf('/message/detail/') > -1){
                this.setState({
                    showNav: false,
                    showMenu: false
                })
            }
            else{
                this.setState({
                    showNav: true,
                    showMenu: false
                })
            }
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

    render(){
        return(
            <AdminNavigation 
            {...this.props} 
            {...this.state} 
            openMenu={this._openMenu}
            closeMenu={this._closeMenu}
            handleShowMenu={this._handleShowMenu}
            />
        )
    }
}

export default Container;