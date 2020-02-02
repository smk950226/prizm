import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Description from './presenter';
import { scroller } from 'react-scroll';

class Container extends Component{
    static propTypes = {
        menu: PropTypes.string
    }

    componentDidMount = () => {
        if(this.props.location.state){
            if(this.props.location.state.menu){
                scroller.scrollTo(this.props.location.state.menu, {
                    duration: 500,
                    delay: 100,
                    smooth: true,
                    offset: -100
                })
            }
        }
    }

    render(){
        return (
            <Description 
            {...this.props} 
            {...this.state}
            />
        )
    }
}

export default Container; 