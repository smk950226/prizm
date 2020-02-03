import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from './presenter';

class Container extends Component{
    static propTypes = {
        goTerms: PropTypes.func.isRequired,
        pathname: PropTypes.string.isRequired
    }

    render(){
        if(this.props.pathname === '/welcome/'){
            return null
        }
        else{
            return(
                <Footer 
                {...this.props} 
                {...this.state} 
                />
            )
        }
    }
}

export default Container;