import React, { Component } from 'react';
import Home from './presenter';

class Container extends Component{
    state = {
        username: ""
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value,
        });
    }

    render(){
        return (
            <Home 
            {...this.props} 
            {...this.state}
            handleInputChange={this._handleInputChange}
            />
        )
    }
}

export default Container; 