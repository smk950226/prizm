import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './presenter';

class Container extends Component{
    static propTypes = {
        logout: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
    }

    constructor(props){
        super(props);
        const { pathname } = props;
        this.state = {
            pageType: pathname,
            showMenu: false
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
                />
            )
        }
    }
}

export default Container;