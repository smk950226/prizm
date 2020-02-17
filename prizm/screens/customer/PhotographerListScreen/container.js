import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Home from './presenter';
import { NavigationEvents } from "react-navigation";

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
            refreshing: false,
        }
    }

    componentDidMount = async() => {
        const { getPhotographerList, photographerList } = this.props;
        await getPhotographerList()
        if(photographerList){
            this.setState({
                loading: false
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        let update = {}
        if(nextProps.photographerList){
            update.photographerList = nextProps.photographerList
            update.refreshing = false
            return update
        }
        else{
            return null
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

    _refresh = async() => {
        const { getPhotographerList } = this.props;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })
        await getPhotographerList()
    }  

    _remount = async() => {
        const { getPhotographerList } = this.props;
        this.setState({
            fetchClear: false
        })
        await getPhotographerList()
    }

    render(){
        const { photographerList } = this.state;
        return (
            <Fragment>
                <NavigationEvents
                onWillFocus={payload => {
                    this._remount()
                }}
                />
                <Home 
                {...this.props} 
                {...this.state}
                photographerList={photographerList}
                photographerListMore={this._photographerListMore}
                refresh={this._refresh}
                />
            </Fragment>
        )
    }
}

export default Container; 