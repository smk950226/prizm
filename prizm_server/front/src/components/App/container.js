import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from './presenter';

class Container extends Component{
    static propTypes = {
        profile: PropTypes.object,
        initApp: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        notification: PropTypes.array
    }

    state = {
        lastScrollTop: 0,
        delta: 30,
        showBtmNav: true
    }

    componentDidMount(){
        window.addEventListener('scroll', this._handleScroll, false)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._handleScroll, false);
    }

    _handleScroll = async() => {
        const { lastScrollTop, delta, showBtmNav } = this.state;
        const { show_nav_btm, handleNavBtm, bottom, bottomReached, bottomReachedCancel } = this.props;
        var st = window.pageYOffset;
        if (Math.abs(lastScrollTop - st) <= delta) return;
        if ((st > lastScrollTop) && (lastScrollTop > 0)) {
            if(showBtmNav){
                this.setState({
                    showBtmNav: false
                })
            }
        }
        else {
            if(!showBtmNav){
                this.setState({
                    showBtmNav: true
                })
            }
        }
        this.setState({
            lastScrollTop: st
        })
    }

    render(){
        return <App {...this.props} {...this.state} />
    }
}

export default Container; 