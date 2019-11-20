import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageList from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
    }

    componentDidMount = async() => {
        if(!this.props.isLoggedIn){
            this.props.goHome()
        }
    }

    render(){
        return(
            <MessageList {...this.props} {...this.state} />
        )
    }
}

export default Container;