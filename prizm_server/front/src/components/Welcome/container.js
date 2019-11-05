import React, { Component } from 'react';
import Welcome from './presenter';

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

    _handleKeyPress = (event) => {
        const { key } = event;
        const { username } = this.state;
        if(username !== ""){
            if (key === "Enter") {
                event.preventDefault();
                alert('제출되었습니다.')
                this.setState({
                    username: ""
                })
            }
        }
    }

    _submit = () => {
        const { username } = this.state;
        if(username !== ""){
            alert('제출되었습니다.')
            this.setState({
                username: ""
            })
        }
    }

    render(){
        return (
            <Welcome 
            {...this.props} 
            {...this.state}
            handleInputChange={this._handleInputChange}
            handleKeyPress={this._handleKeyPress}
            submit={this._submit}
            />
        )
    }
}

export default Container; 