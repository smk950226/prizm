import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Review from './presenter';


class Container extends Component{
    static propTypes = {
        review: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        totalLength: PropTypes.number.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        isTruncated: true
    }

    _doTruncate = () => {
        this.setState({
            isTruncated: true
        })
    }

    _undoTruncate = () => {
        this.setState({
            isTruncated: false
        })
    }

    render(){
        return(
            <Review 
            {...this.props} 
            {...this.state} 
            doTruncate={this._doTruncate}
            undoTruncate={this._undoTruncate}
            />
        )
    }
}

export default Container;