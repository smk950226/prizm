import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './presenter';

class Container extends Component{
    static propTypes = {
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        showBtmNav: PropTypes.bool.isRequired,
        goMySchedule: PropTypes.func.isRequired,
        goProfileMenu: PropTypes.func.isRequired,
        goMessage: PropTypes.func.isRequired,
        newMessage: PropTypes.bool
    }

    constructor(props){
        super(props);
        const { pathname } = props;
        this.state = {
            pageType: pathname,
            showNav: true
        }
    }

    componentDidMount = () => {
        if(this.props.pathname.indexOf('/message/detail/') > -1){
            this.setState({
                showNav: false
            })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.pathname !== this.props.pathname){
            if(this.props.pathname.indexOf('/message/detail/') > -1){
                this.setState({
                    showNav: false
                })
            }
            else{
                this.setState({
                    showNav: true
                })
            }
        }
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
                />
            )
        }
    }
}

export default Container;