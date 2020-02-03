import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminStudioSettingClear from './presenter';

class Container extends Component{
    static propTypes = {
        goHome: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        this.state = {
            valid: props.location.state ? props.location.state.valid ? props.location.state.valid : false : false,
            studioId: props.location.state ? props.location.state.studioId ? props.location.state.studioId : "" : "",
        }
    }

    componentWillMount = () => {
        const { valid } = this.state;
        const { goHome } = this.props;
        if(!valid){
            goHome()
        }
    }

    render(){
        return(
            <AdminStudioSettingClear 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;