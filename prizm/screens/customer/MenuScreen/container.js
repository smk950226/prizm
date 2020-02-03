import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuScreen from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        getProfile: PropTypes.func.isRequired,
    }

    constructor(props){
        super(props)
        this.state = {
            now: new Date().getHours()
        }
    }

    componentDidUpdate(prevProps){
        const isDrawerOpen = this.props.navigation.state.isDrawerOpen;
        const wasDrawerOpen = prevProps.navigation.state.isDrawerOpen;
          
        if(!wasDrawerOpen && isDrawerOpen){
            this.setState({
                now: new Date().getHours()
            })
        }
      }

    render(){
        return(
            <MenuScreen 
                {...this.props} 
                {...this.state}
            />
        )
    }
}

export default Container; 