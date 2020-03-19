import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Home from './presenter';
import Loader from 'react-loader-spinner';
import styles from '../../style/styles.module.scss';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Container extends Component{
    static propTypes = {
        getPhotographerList: PropTypes.func.isRequired,
        getPhotographerListMore: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        const { photographerList } = props;
        this.state = {
            photographerList,
            loading: true,
            page: 1,
            hasNextPage: true,
            isLoadingMore: false,
            fetchedPhotographerList: false,
            fetchClear: false
        }
    }

    componentDidMount = async() => {
        const { getPhotographerList, photographerList } = this.props;
        if(photographerList){
            this.setState({
                loading: false,
                fetchClear: true
            })
        }
        else{
            await getPhotographerList()
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedPhotographerList } = prevState;
        if(!fetchedPhotographerList){
            let update = {}
            if(nextProps.photographerList){
                update.fetchedPhotographerList = true
                update.photographerList = nextProps.photographerList
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.state.fetchedPhotographerList && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true,
            })
        }
    }

    _photographerListMore = async() => {
        const { page, isLoadingMore, hasNextPage } = this.state;
        const { getPhotographerListMore } = this.props;
        if(!isLoadingMore){
            if(hasNextPage){
                this.setState({
                    isLoadingMore: true
                })
                const result = await getPhotographerListMore(page+1)
                if(result){
                    this.setState({
                        page: page+1,
                        photographerList: [...this.state.photographerList, ...result]
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
                else{
                    this.setState({
                        hasNextPage: false
                    })
                    await sleep(500)
                    this.setState({
                        isLoadingMore: false
                    })
                }
            }
        }
    }

    _afterRender = async(photographerId) => {
        const { photographerList } = this.state;
        const { getPhotographerPortfoliomore } = this.props;
        const result = await getPhotographerPortfoliomore(photographerId)
        if(result.status === 'ok'){
            return result.portfolios
        }
        else{
            return []
        }
    }

    render(){
        const { photographerList } = this.state;
        return (
            <Home 
            {...this.props} 
            {...this.state}
            photographerList={photographerList}
            handleInputChange={this._handleInputChange}
            handleKeyPress={this._handleKeyPress}
            submit={this._submit}
            photographerListMore={this._photographerListMore}
            afterRender={this._afterRender}
            />
        )
    }
}

export default Container; 