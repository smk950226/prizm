import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './presenter';

class Container extends Component{
    static propTypes = {
        logout: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        notification: PropTypes.array,
        goSignIn: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired,
        goMySchedule: PropTypes.func.isRequired,
        goProfile: PropTypes.func.isRequired,
        goTerms: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        const { pathname } = props;
        this.state = {
            pageType: pathname,
            showMenu: false,
            showNav: true
        }
    }

    componentDidMount = () => {
        if((this.props.pathname.indexOf('/message/detail/') > -1) || (this.props.pathname.indexOf('/review/list/') > -1)){
            this.setState({
                showNav: false
            })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.pathname !== this.props.pathname){
            if((this.props.pathname.indexOf('/message/detail/') > -1) || (this.props.pathname.indexOf('/review/list/') > -1)){
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

    _logout = () => {
        this.props.logout()
        this.props.goHome()
        this.setState({
            showMenu: false
        })
    }

    render(){
        if(this.state.pageType === '/welcome/'){
            return null
        }
        else{
            return(
                <Navigation 
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
}

export default Container;