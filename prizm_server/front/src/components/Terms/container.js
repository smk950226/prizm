import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Terms from './presenter';

class Container extends Component{
    static propTypes = {
        getTerm: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        error: false,
        term: {}
    }

    componentDidMount = async() => {
        const { match : { params : { name } }, getTerm } = this.props;
        const result = await getTerm(name);
        if(result.status === 'ok'){
            this.setState({
                loading: false,
                term: result.data
            })
        }
        else{
            this.setState({
                loading: false,
                error: true
            })
        }
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevProps.match.params.name !== this.props.match.params.name){
            const { match : { params : { name } }, getTerm } = this.props;
            const result = await getTerm(name);
            if(result.status === 'ok'){
                this.setState({
                    loading: false,
                    term: result.data
                })
            }
            else{
                this.setState({
                    loading: false,
                    error: true
                })
            }
        }
    }

    render(){
        return(
            <Terms 
            {...this.props}
            {...this.state}
            />
        )
    }
}  

export default Container;