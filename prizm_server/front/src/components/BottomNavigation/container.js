import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './presenter';

class Container extends Component{
    static propTypes = {
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        showBtmNav: PropTypes.bool.isRequired
    }

    constructor(props){
        super(props);
        const { pathname } = props;
        this.state = {
            pageType: pathname
        }
    }

    render(){
        return(
            <Navigation 
            {...this.props} 
            {...this.state} 
            />
        )
    }
}

export default Container;