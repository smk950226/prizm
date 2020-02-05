import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuScreen from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        getProfile: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        this.state = {
            now: new Date().getHours()
        }
    }

    componentDidMount = async() => {
        const { isLoggedIn, getProfile } = this.props;
        if(isLoggedIn){
            await getProfile()
        }
    }

    componentDidUpdate = (prevProps) => {
        const isDrawerOpen = this.props.navigation.state.isDrawerOpen;
        const wasDrawerOpen = prevProps.navigation.state.isDrawerOpen;
          
        if(!wasDrawerOpen && isDrawerOpen){
            this.setState({
                now: new Date().getHours()
            })
        }
        if(!prevProps.isLoggedIn && this.props.isLoggedIn){
            this.props.getProfile()
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