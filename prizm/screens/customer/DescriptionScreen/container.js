import React, { Component } from 'react';
import DescriptionScreen from './presenter';

class Container extends Component{
    constructor(props){
        super(props)
        const menu = props.navigation.getParam('menu', null)
        this.state = {
            menu
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps !== this.props){
            const menu = this.props.navigation.getParam('menu', null)
            console.log(menu)
            this.setState({
                menu
            })
            this.props.navigation.closeDrawer()
        }
    }

    render(){
        return(
            <DescriptionScreen 
            {...this.props} 
            {...this.state}
            />
        )
    }
}

export default Container;