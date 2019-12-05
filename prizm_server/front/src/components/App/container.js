import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from './presenter';

class Container extends Component{
    static propTypes = {
        profile: PropTypes.object,
        initApp: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        notification: PropTypes.array,
        orderList: PropTypes.array,
        initAdmin: PropTypes.func.isRequired,
        photographer: PropTypes.any,
        chatList: PropTypes.array,
        newMessage: PropTypes.bool
    }

    state = {
        lastScrollTop: 0,
        delta: 30,
        showBtmNav: true,
        admin: false
    }

    componentDidMount(){
        window.addEventListener('scroll', this._handleScroll, false)
        if((window.location.href.startsWith('http://admin.prizm.cloud/')) || (window.location.href.startsWith('https://admin.prizm.cloud/'))){
            this.setState({
                admin: true
            })
        }
        else if((window.location.href.startsWith('http://prizm.cloud/')) || (window.location.href.startsWith('https://prizm.cloud/'))){
            this.setState({
                admin: false
            })
        }
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._handleScroll, false);
    }

    _handleScroll = async() => {
        const { lastScrollTop, delta, showBtmNav } = this.state;
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